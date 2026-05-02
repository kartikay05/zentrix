import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// auth routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/get-me', isAuthenticated, getMe);

export default authRouter;