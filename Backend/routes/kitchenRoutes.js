import express from "express";
import { getKitchenOrders } from "../controllers/kitchenController.js";
import { protect, restaurantOwner } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all orders for kitchen monitoring
router.get("/orders", protect, restaurantOwner, getKitchenOrders);

export default router;
