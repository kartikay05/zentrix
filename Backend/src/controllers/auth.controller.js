import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * Register a new user
 * Validation is handled by registerValidator middleware
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    // Create user (password hashing is handled in user.model.js pre-save hook)
    const user = await userModel.create({ name, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
