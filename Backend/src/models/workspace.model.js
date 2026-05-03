import mongoose from "mongoose";
import crypto from "crypto";

const workspaceSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },

    // 🔐 Store hashed API key (not raw)
    apiKey: {
      type: String,
      select: false,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      match: /^\S+@\S+\.\S+$/,
    },

    githubRepo: {
      type: String,
      trim: true,
      default: null,
      match: /^https:\/\/github\.com\/[^/]+\/[^/]+$/,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    aiSettings: {
      alertSensitivity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
      },
      autoResolve: {
        type: Boolean,
        default: false,
      },
      autoResolveLimit: {
        type: Number,
        default: 10,
        min: 1,
        max: 1000,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// ── Indexes ─────────────────────────────
workspaceSchema.index({ orgName: "text", projectName: "text" });


// ── Utility: Slug Generator ─────────────
function generateSlug(org, project) {
  return `${org}-${project}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


// ── Pre-save Hook ───────────────────────
workspaceSchema.pre("save", async function (next) {
  // 🔹 Generate unique slug
  if (!this.slug) {
    let baseSlug = generateSlug(this.orgName, this.projectName);
    let slug = baseSlug;
    let counter = 1;

    while (await mongoose.models.Workspace.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }

  // 🔹 Generate & hash API key
  if (!this.apiKey) {
    const rawKey = `zx_${crypto.randomBytes(32).toString("hex")}`;

    this._apiKey = rawKey; // temporary (send once to user)

    this.apiKey = crypto
      .createHash("sha256")
      .update(rawKey)
      .digest("hex");
  }

});


// ── Method: Validate API key ────────────
workspaceSchema.methods.validateApiKey = function (key) {
  const hashed = crypto.createHash("sha256").update(key).digest("hex");
  return this.apiKey === hashed;
};


// ── Method: Regenerate API key ─────────
workspaceSchema.methods.regenerateApiKey = async function () {
  const rawKey = `zx_${crypto.randomBytes(32).toString("hex")}`;

  this.apiKey = crypto
    .createHash("sha256")
    .update(rawKey)
    .digest("hex");

  await this.save();

  return rawKey; // return only once
};


export default mongoose.model("Workspace", workspaceSchema);
