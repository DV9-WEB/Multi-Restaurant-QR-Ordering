import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
  paymentMethod: {
    type: String,
    enum: ["online"], // Only online payments allowed
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
});

export default mongoose.model("Subscription", subscriptionSchema);
