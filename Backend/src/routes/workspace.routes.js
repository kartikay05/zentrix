import { Router } from "express";
import {
    getAllWorkspaces,
    getWorkspaceById,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace
} from "../controllers/workspace.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const workspaceRouter = Router();

// All workspace routes require authentication
workspaceRouter.use(isAuthenticated);

// GET all workspaces
workspaceRouter.get("/", getAllWorkspaces);

// GET workspace by ID
workspaceRouter.get("/:id", getWorkspaceById);

// POST create new workspace
workspaceRouter.post("/", createWorkspace);

// PATCH update workspace
workspaceRouter.patch("/:id", updateWorkspace);

// DELETE workspace
workspaceRouter.delete("/:id", deleteWorkspace);

export default workspaceRouter;
