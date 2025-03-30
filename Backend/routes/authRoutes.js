import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  uploadRestaurantImage,
} from "../controllers/authController.js";
import { protect, restaurantOwner } from "../middleware/authMiddleware.js";
import {
  uploadFoodImage,
  uploadRestaurantImage as uploadRestaurantImg,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

// ✅ Food Image Upload (For Menu Items)
router.put(
  "/uploadFoodImage",
  protect,
  restaurantOwner,
  uploadFoodImage.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    res.json({
      message: "Food image uploaded successfully",
      imageUrl: req.file.path,
    });
  }
);

// ✅ Restaurant Image Upload
router.put(
  "/uploadRestaurantImage",
  protect,
  restaurantOwner,
  uploadRestaurantImg.single("image"),
  uploadRestaurantImage
);

export default router;
