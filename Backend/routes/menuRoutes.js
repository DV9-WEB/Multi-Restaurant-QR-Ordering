import express from "express";
import {
  getMenu,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
} from "../controllers/menuController.js";
import { protect, ownerProtect } from "../middleware/authMiddleware.js";
import { uploadFoodImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/:restaurantId", getMenu); // ✅ Get menu items for a restaurant
router.post(
  "/",
  protect,
  ownerProtect,
  uploadFoodImage.single("image"),
  addMenuItem
); // ✅ Add new menu item
router.put(
  "/:id",
  protect,
  ownerProtect,
  uploadFoodImage.single("image"),
  updateMenuItem
); // ✅ Update menu item
router.delete("/:id", protect, ownerProtect, deleteMenuItem); // ✅ Delete menu item

export default router;
