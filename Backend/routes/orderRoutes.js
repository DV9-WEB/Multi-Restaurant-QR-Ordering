import express from "express";
import {
  placeOrder,
  getOrdersByRestaurant,
  updateOrderStatus,
  cancelOrder,
  verifyOfflinePayment,
} from "../controllers/orderController.js";
import { protect, restaurantOwner } from "../middleware/authMiddleware.js";

const router = express.Router();

// Place an Order
router.post("/", placeOrder);

// Get Orders for a Specific Restaurant (Only Restaurant Owner Can See)
router.get("/:restaurantId", protect, restaurantOwner, getOrdersByRestaurant);

// Update Order Status (Only Restaurant Owner Can Do This)
router.put("/:orderId", protect, restaurantOwner, updateOrderStatus);

// Cancel Order (Customer Can Do This Within 30 Seconds)
router.delete("/:orderId", cancelOrder);

// ✅ Verify Offline Payment (Only Restaurant Owner)
router.put(
  "/:orderId/verify-payment",
  protect,
  restaurantOwner,
  verifyOfflinePayment
);

export default router;
