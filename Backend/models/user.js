import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 🔹 **Convert String ID to ObjectId**
const toObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    return null; // Invalid ID case
  }
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "restaurantOwner"],
      default: "restaurantOwner",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    restaurantImage: {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

// 🔐 **Password Hashing Before Saving**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 **Password Verification Method**
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 **Ensure Owner Field is ObjectId (Only for restaurantOwner)**
userSchema.pre("save", function (next) {
  if (this.role === "restaurantOwner" && this.owner) {
    this.owner = toObjectId(this.owner);
  } else {
    this.owner = undefined; // Remove owner for admin users
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
