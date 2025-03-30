import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Log request body

    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists!");
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    if (user) {
      console.log("User Created Successfully:", user);
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      console.log("Invalid User Data!");
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("❌ Registration Error:", error); // Log full error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log("Found User:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordMatch = await user.matchPassword(password);
    console.log("Password Match:", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate Token & Store in Cookie
    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logoutUser = async (req, res) => {
res.clearCookie("jwt", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
});
  res.setHeader("Authorization", ""); // Clear Authorization header
  res.json({ message: "Logged out successfully" });
};

/**
 * @desc Get user profile
 * @route GET /api/auth/profile
 * @access Private (Only logged-in user)
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Upload or Update Restaurant Image
 * @route PUT /api/user/uploadImage
 * @access Private (Only Restaurant Owner)
 */
export const uploadRestaurantImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // ✅ Cloudinary se URL fetch kar rahe hain
    user.restaurantImage = req.file.path;
    await user.save();

    res.json({
      message: "Restaurant image uploaded successfully",
      image: user.restaurantImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

