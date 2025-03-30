import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Subscription ke liye admin, food payment ke liye restaurant owner
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      default: null, // Subscription case me null hoga
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      default: null, // Food order ke case me null hoga
    },
    customerName: { type: String, default: null }, // Food payment ke liye
    tableNumber: { type: Number, default: null }, // Food payment ke liye
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["online", "offline"], // Food ke liye dono allowed, subscription ke liye sirf online
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      default: null, // Online payment ke case me transaction ID store hoga
    },
    paidTo: {
      type: String,
      enum: ["admin", "restaurantOwner"], // Paisa kisko jayega
      required: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Offline payment ke case me kisne verify kiya
      default: null,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
