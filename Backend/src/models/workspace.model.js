import mongoose from "mongoose";
import crypto from "crypto";

/**
 * Workspace Schema
 * A workspace is the top-level organisational unit on the Zentrix platform.
 * Each workspace corresponds to one organisation / project team and holds
 * the configuration needed for AI-driven incident response (API keys,
 * GitHub integration, etc.).
 */
const workspaceSchema = new mongoose.Schema(
  {
    // Organisation / company name
    orgName: {
      type: String,
      required: [true, "Organisation name is required"],
      trim: true,
      minlength: [2, "Organisation name must be at least 2 characters"],
      maxlength: [150, "Organisation name cannot exceed 150 characters"],
    },

    // Internal project name within the organisation
    projectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [150, "Project name cannot exceed 150 characters"],
    },

    // Unique slug used in URLs / API paths  (e.g. "acme-corp-ops")
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // API key for integrating external services (alerts, monitoring tools, etc.)
    apiKey: {
      type: String,
      unique: true,
      select: false, // Hidden from general queries for security
    },

    // Contact / notification email for the workspace
    email: {
      type: String,
      required: [true, "Workspace contact email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    // GitHub repository URL for automated incident linking / PR analysis
    githubRepo: {
      type: String,
      trim: true,
      default: null,
      match: [
        /^https:\/\/github\.com\/.+\/.+$/,
        "Please provide a valid GitHub repository URL",
      ],
    },

    // Who created (owns) this workspace — references the User collection
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional description / mission statement for the workspace
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: null,
    },

    // Whether the workspace is active or has been soft-deleted
    isActive: {
      type: Boolean,
      default: true,
    },

    // AI-specific settings for incident response behaviour
    aiSettings: {
      // Sensitivity level of AI alerting (low / medium / high / critical)
      alertSensitivity: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
      },
      // Automatic resolution enabled?
      autoResolve: {
        type: Boolean,
        default: false,
      },
      // Maximum incidents the AI will auto-resolve per day
      autoResolveLimit: {
        type: Number,
        default: 10,
      },
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false,
  }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
workspaceSchema.index({ slug: 1 });
workspaceSchema.index({ createdBy: 1 });
workspaceSchema.index({ orgName: "text", projectName: "text" }); // Full-text search

// ── Pre-validate hook: auto-generate slug & apiKey ──────────────────────────
workspaceSchema.pre("validate", function (next) {
  // Generate URL-safe slug from orgName + projectName if not provided
  if (!this.slug && this.orgName && this.projectName) {
    this.slug = `${this.orgName}-${this.projectName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Auto-generate a secure API key if not already set
  if (!this.apiKey) {
    this.apiKey = `zx_${crypto.randomBytes(32).toString("hex")}`;
  }

  next();
});

// ── Instance Method: regenerate API key ──────────────────────────────────────
workspaceSchema.methods.regenerateApiKey = function () {
  this.apiKey = `zx_${crypto.randomBytes(32).toString("hex")}`;
  return this.save();
};

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
