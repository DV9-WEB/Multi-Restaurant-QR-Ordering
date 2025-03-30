import Order from "../models/order.js";
import { updateKitchenOrders } from "./kitchenController.js"; // ✅ Correct Import

/**
 * @desc Place an order
 * @route POST /api/orders
 * @access Public
 */
export const placeOrder = async (req, res) => {
  try {
    const { restaurantId, tableNumber, customerName, items, paymentMethod } =
      req.body;

    if (!["online", "offline"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    let totalAmount = 0;
    const populatedItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem); // ✅ Fetch price from DB
      if (!menuItem) {
        return res
          .status(404)
          .json({ message: `Menu item not found: ${item.menuItem}` });
      }

      populatedItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price, // ✅ Correct price added
      });

      totalAmount += item.quantity * menuItem.price;
    }

    const order = await Order.create({
      restaurant: restaurantId,
      tableNumber,
      customerName,
      items: populatedItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "paid" : "pending", // ✅ If online, mark as paid
      status: "pending",
    });

    updateKitchenOrders(order); // ✅ Notify kitchen

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


/**
 * @desc Cancel an order
 * @route DELETE /api/orders/:orderId
 * @access Private (Restaurant Owner or Customer)
 */
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Order cannot be canceled after processing starts" });
    }

    await Order.findByIdAndDelete(orderId);

    // ✅ Emit event to remove order from kitchen monitor
    updateKitchenOrders({ _id: orderId, status: "canceled" });

    res.json({ message: "Order canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


/**
 * @desc Get Orders by Restaurant
 * @route GET /api/orders/restaurant/:restaurantId
 * @access Private (Only Restaurant Owner)
 */
export const getOrdersByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const orders = await Order.find({ restaurant: restaurantId });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Update Order Status
 * @route PUT /api/orders/:orderId
 * @access Private (Only Restaurant Owner)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // New status from request body

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    // ✅ Notify kitchen panel in real-time
    updateKitchenOrders(order);

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const verifyOfflinePayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentMethod !== "offline") {
      return res
        .status(400)
        .json({ message: "This order was not paid offline" });
    }

    if (order.paymentStatus === "paid") {
      return res.status(400).json({ message: "Payment is already verified" });
    }

    order.paymentStatus = "paid";
    await order.save();

    res.json({ message: "Offline payment verified successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};