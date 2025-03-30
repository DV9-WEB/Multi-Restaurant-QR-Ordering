import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    cuisine: { type: String }, // ✅ Not required
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    isActive: {
      type: Boolean,
      default: function () {
        return !!this.subscription; // ✅ Auto-enable if subscription exists
      },
    },
    profileImage: { type: String }, // ✅ Add profile image field
    description: { type: String },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant; 