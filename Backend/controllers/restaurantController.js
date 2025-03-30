import mongoose from "mongoose"; // ✅ Add this
import Restaurant from "../models/restaurant.js";

/**
 * @desc Get all restaurants
 * @route GET /api/restaurants
 * @access Public
 */
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Get a restaurant by ID
 * @route GET /api/restaurants/:id
 * @access Public
 */
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Create a new restaurant (Admin Only)
 * @route POST /api/restaurants
 * @access Private (Admin)
 */
export const createRestaurant = async (req, res) => {
  try {
    const { name, address, cuisine, owner, subscription } = req.body;
    console.log("Received Data", req.body);

    const restaurant = new Restaurant({
      name,
      address,
      cuisine,
      owner: req.user._id,
    });

    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Update a restaurant (Admin Only)
 * @route PUT /api/restaurants/:id
 * @access Private (Admin)
 */
export const updateRestaurant = async (req, res) => {
  try {
    const { name, address, cuisine } = req.body;
    const restaurant = await Restaurant.findById(req.params.id);

    if (restaurant) {
      restaurant.name = name || restaurant.name;
      restaurant.address = address || restaurant.address;
      restaurant.cuisine = cuisine || restaurant.cuisine;

      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Delete a restaurant (Admin Only)
 * @route DELETE /api/restaurants/:id
 * @access Private (Admin)
 */
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Delete related menu items
    await Menu.deleteMany({ restaurant: restaurant._id });

    // Delete related orders
    await Order.deleteMany({ restaurant: restaurant._id });

    // Delete from Cloudinary (if images exist)
    if (restaurant.imagePublicId) {
      await cloudinary.uploader.destroy(restaurant.imagePublicId);
    }

    await restaurant.deleteOne();

    res.json({ message: "Restaurant removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * @desc Get restaurant by owner ID
 * @route GET /api/restaurants/owner
 * @access Private (Owner)
 */
export const getOwnerRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
