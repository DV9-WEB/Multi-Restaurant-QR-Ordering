import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    }, // ✅ Added Description
    price: {
      type: Number,
      required: true,
    },
    image: {
      url: { type: String, required: true }, // ✅ Image URL
      publicId: { type: String, required: true }, // ✅ Cloudinary ID
    },
    category: {
      type: String,
      enum: ["Starter", "Main Course", "Dessert", "Beverage"], // ✅ Restricted Categories
      required: true,
    },
    spiceLevel: {
      type: String,
      enum: ["Low", "Medium", "High"], // ✅ Controlled Values
      default: "Medium",
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
