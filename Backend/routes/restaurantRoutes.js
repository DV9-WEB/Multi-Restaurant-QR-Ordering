import express from "express"; 
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getOwnerRestaurant, // ✅ Import this function
} from "../controllers/restaurantController.js";
import { protect, admin, ownerProtect } from "../middleware/authMiddleware.js"; // ✅ Ensure Correct Import

const router = express.Router();

// Get All Restaurants
router.get("/", getRestaurants);

// ✅ FIX: Place this BEFORE "/:id" to avoid conflicts
router.get("/my-restaurant", protect, ownerProtect, getOwnerRestaurant);

// Get Restaurant by ID
router.get("/:id", getRestaurantById);

// Create New Restaurant (Admin Only)
router.post("/", protect, ownerProtect, createRestaurant);

// Update Restaurant (Admin Only)
router.put(
  "/:id",
  protect,
  (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "restaurantOwner") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  },
  updateRestaurant
);

// Delete Restaurant (Admin Only)
router.delete("/:id", protect, admin, deleteRestaurant);

export default router;
