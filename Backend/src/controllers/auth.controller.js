import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// Generate JWT token
const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, config.JWT_SECRET || "fallback_secret", {
        expiresIn: "7d",
    });
};

// ===========================
// REGISTER
// ===========================
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and password",
            });
        }

        // Validate name length
        if (name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 2 characters long",
            });
        }

        // Validate email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address",
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }

        // Create new user
        const user = await userModel.create({ name, email, password });

        const token = generateToken(user._id, user.email);

        return res.status(201).cookie("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }).json({
            success: true,
            message: "Registration successful",
            user: user.toSafeObject(),
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// ===========================
// LOGIN
// ===========================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Find user with password field
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No account found with this email address",
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password. Please try again",
            });
        }

        // Update last login
        user.lastLoginAt = new Date();
        await user.save({ validateBeforeSave: false });

        const token = generateToken(user._id, user.email);

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        }).json({
            success: true,
            message: "Login successful",
            user: user.toSafeObject(),
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// ===========================
// LOGOUT
// ===========================
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
        }).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// ===========================
// GET ME
// ===========================
export const getMe = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user: user.toSafeObject(),
        });
    } catch (error) {
        console.error("GetMe Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};