import Subscription from "../models/subscription.js";
import Restaurant from "../models/restaurant.js";
import Payment from "../models/payment.js";

/**
 * @desc Subscribe or Renew Subscription
 * @route POST /api/subscriptions
 * @access Private (Only restaurant owners)
 */
export const subscribeOwner = async (req, res) => {
  try {
    const { plan, duration, paymentMethod } = req.body;

    // Only allow online payments
    if (paymentMethod !== "online") {
      return res
        .status(400)
        .json({ message: "Only online payment is allowed for subscription" });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (restaurant) {
      restaurant.isActive = true;
      await restaurant.save();
    }


    // Check if user already has a subscription
    let subscription = await Subscription.findOne({ owner: req.user._id });

    if (
      subscription &&
      subscription.status === "active" &&
      subscription.expiresAt > new Date()
    ) {
      return res
        .status(400)
        .json({ message: "You already have an active subscription" });
    }

    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + duration);

    if (subscription) {
      // Renew existing subscription
      subscription.plan = plan;
      subscription.duration = duration;
      subscription.expiresAt = expiresAt;
      subscription.status = "active";
      subscription.paymentMethod = paymentMethod;
      subscription.paymentStatus = "pending";
      await subscription.save();
    } else {
      // Create new subscription
      subscription = await Subscription.create({
        owner: req.user._id,
        plan,
        duration,
        expiresAt,
        status: "active",
        paymentMethod,
        paymentStatus: "pending",
      });
    }

    const payment = await Payment.create({
      owner: req.user._id,
      subscription: subscription._id,
      amount: duration === 12 ? 1200 : 100, // Example pricing logic
      method: paymentMethod,
      status: paymentMethod === "online" ? "successful" : "pending",
      paidTo: "admin",
    });

    subscription.paymentStatus = "paid"; // ✅ Update status
    await subscription.save();

    // Link subscription to the restaurant
    restaurant.subscription = subscription._id;
    await restaurant.save();

    // Redirect to online payment
    res.status(200).json({
      message: "Subscription initiated. Redirect to payment gateway.",
      subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
