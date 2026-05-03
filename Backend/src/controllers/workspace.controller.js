import workspaceModel from "../models/workspace.model.js";

/**
 * Get all workspaces from the database
 * GET /api/workspace/
 */
export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await workspaceModel.find()
            .populate("createdBy", "name email") // Populate user details
            .exec();

        if (!workspaces || workspaces.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No workspaces found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workspaces retrieved successfully",
            data: workspaces
        });

    } catch (error) {
        console.error("Get All Workspaces Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * Get workspace details by ID
 * GET /api/workspace/:id
 */
export const getWorkspaceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required"
            });
        }

        const workspace = await workspaceModel.findById(id)
            .populate("createdBy", "name email")
            .exec();

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workspace retrieved successfully",
            data: workspace
        });

    } catch (error) {
        console.error("Get Workspace By ID Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * Create a new workspace
 * POST /api/workspace/
 */
export const createWorkspace = async (req, res) => {
    try {
        const { orgName, projectName, email, githubRepo, description, aiSettings } = req.body;
        const userId = req.userId; // From auth middleware

        // Validation
        if (!orgName || !projectName || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide orgName, projectName, and email"
            });
        }

        // Check if email is valid
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Create workspace
        const workspace = await workspaceModel.create({
            orgName,
            projectName,
            email,
            githubRepo: githubRepo || null,
            description: description || null,
            createdBy: userId,
            aiSettings: aiSettings || {
                alertSensitivity: "medium",
                autoResolve: false,
                autoResolveLimit: 10
            }
        });

        return res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            data: workspace
        });

    } catch (error) {
        console.error("Create Workspace Error:", error);

        // Handle duplicate slug or apiKey errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `A workspace with this ${field} already exists`
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * Update a workspace by ID
 * PATCH /api/workspace/:id
 */
export const updateWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // From auth middleware
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required"
            });
        }

        // Find workspace first
        const workspace = await workspaceModel.findById(id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            });
        }

        // Check if user is the creator of the workspace
        if (workspace.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this workspace"
            });
        }

        // Prevent updating createdBy and apiKey fields
        delete updateData.createdBy;
        delete updateData.apiKey;
        delete updateData.slug; // Slug should not be updated manually

        // Update workspace
        const updatedWorkspace = await workspaceModel.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            message: "Workspace updated successfully",
            data: updatedWorkspace
        });

    } catch (error) {
        console.error("Update Workspace Error:", error);

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors)
                .map(err => err.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: messages
            });
        }

        // Handle duplicate email or other unique field errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `A workspace with this ${field} already exists`
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

/**
 * Delete a workspace by ID
 * DELETE /api/workspace/:id
 */
export const deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; // From auth middleware

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required"
            });
        }

        // Find workspace
        const workspace = await workspaceModel.findById(id);
        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            });
        }

        // Check if user is the creator of the workspace
        if (workspace.createdBy.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this workspace"
            });
        }

        // Delete workspace
        await workspaceModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Workspace deleted successfully"
        });

    } catch (error) {
        console.error("Delete Workspace Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
