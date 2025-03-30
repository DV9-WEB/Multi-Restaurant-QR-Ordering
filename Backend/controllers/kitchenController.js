import Order from "../models/order.js";
import { io } from "../server.js"; // ✅ Import WebSocket instance

/**
 * @desc Get all orders for kitchen monitoring
 * @route GET /api/kitchen/orders
 * @access Private (Only Restaurant Owners)
 */
export const getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({ restaurant: req.user.restaurantId }).sort(
      { createdAt: -1 }
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Send real-time order updates
 * @param {Object} order - New or updated order data
 */
export const updateKitchenOrders = (order) => {
  io.to(`restaurant_${order.restaurant}`).emit("orderUpdated", {
    orderId: order._id,
    status: order.status,
    items: order.items,
  });
};

