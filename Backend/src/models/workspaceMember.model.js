import mongoose from "mongoose";

/**
 * Workspace Member Roles
 * OWNER  – Full control: manage members, billing, delete workspace, all incident actions.
 * MEMBER – Can create / update / resolve incidents and run AI workflows.
 * VIEWER – Read-only access to incidents, dashboards, and reports.
 */
export const WORKSPACE_ROLES = Object.freeze({
  OWNER: "OWNER",
  MEMBER: "MEMBER",
  VIEWER: "VIEWER",
});

/**
 * WorkspaceMember Schema
 * Join table linking a User to a Workspace with a specific role.
 * A user can belong to many workspaces; each membership is a separate document.
 */
const workspaceMemberSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: [true, "Workspace ID is required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    role: {
      type: String,
      enum: {
        values: Object.values(WORKSPACE_ROLES),
        message: `Role must be one of: ${Object.values(WORKSPACE_ROLES).join(", ")}`,
      },
      default: WORKSPACE_ROLES.MEMBER,
    },

    // Invitation tracking
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    inviteAcceptedAt: {
      type: Date,
      default: null,
    },

    // Whether the member's access is currently active
    isActive: {
      type: Boolean,
      default: true,
    },

    // Granular permission overrides (optional, extends base role permissions)
    permissions: {
      canManageMembers: { type: Boolean, default: false },
      canViewBilling:   { type: Boolean, default: false },
      canRunAiWorkflow: { type: Boolean, default: true  },
      canResolveIncidents: { type: Boolean, default: true },
      canDeleteIncidents:  { type: Boolean, default: false },
    },
  },
  {
    timestamps: true, // createdAt = joined at, updatedAt = role last changed at
    versionKey: false,
  }
);

// ── Compound unique index: one membership record per user per workspace ───────
workspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });

// ── Additional query indexes ─────────────────────────────────────────────────
workspaceMemberSchema.index({ userId: 1 });       // "Get all workspaces for a user"
workspaceMemberSchema.index({ workspaceId: 1 });  // "Get all members of a workspace"

// ── Pre-save hook: set role-based default permissions automatically ───────────
workspaceMemberSchema.pre("save", function (next) {
  if (this.isModified("role")) {
    switch (this.role) {
      case WORKSPACE_ROLES.OWNER:
        this.permissions = {
          canManageMembers:    true,
          canViewBilling:      true,
          canRunAiWorkflow:    true,
          canResolveIncidents: true,
          canDeleteIncidents:  true,
        };
        break;

      case WORKSPACE_ROLES.MEMBER:
        this.permissions = {
          canManageMembers:    false,
          canViewBilling:      false,
          canRunAiWorkflow:    true,
          canResolveIncidents: true,
          canDeleteIncidents:  false,
        };
        break;

      case WORKSPACE_ROLES.VIEWER:
        this.permissions = {
          canManageMembers:    false,
          canViewBilling:      false,
          canRunAiWorkflow:    false,
          canResolveIncidents: false,
          canDeleteIncidents:  false,
        };
        break;

      default:
        break;
    }
  }
  next();
});

// ── Static helper: check if a user has a specific role in a workspace ─────────
workspaceMemberSchema.statics.hasRole = async function (userId, workspaceId, roles = []) {
  const membership = await this.findOne({
    userId,
    workspaceId,
    isActive: true,
  });
  if (!membership) return false;
  return roles.includes(membership.role);
};

// ── Instance helper: promote / demote role ────────────────────────────────────
workspaceMemberSchema.methods.changeRole = function (newRole) {
  if (!Object.values(WORKSPACE_ROLES).includes(newRole)) {
    throw new Error(`Invalid role: ${newRole}`);
  }
  this.role = newRole;
  return this.save();
};

const workspaceMemberModel = mongoose.model("WorkspaceMember", workspaceMemberSchema);

export default workspaceMemberModel;
