import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET || "fallback_secret");
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token"
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Token expired or invalid"
        });
    }
};
