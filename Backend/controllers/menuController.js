import MenuItem from "../models/menu.js";
import cloudinary from "../db/cloudinary.js";

// ✅ Get Menu Items (Based on Restaurant)
export const getMenu = async (req, res) => {
  try {
    const menu = await MenuItem.find({ restaurant: req.params.restaurantId });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Add New Menu Item (By Owner)
export const addMenuItem = async (req, res) => {
  try {
    const { name, price, category, restaurantId, spiceLevel } = req.body;

    if (!name || !price || !category || !restaurantId || !req.file) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // ✅ Upload Image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "restaurant-app/menu-items",
    });

    const newMenuItem = new MenuItem({
      name,
      price,
      category,
      restaurant: restaurantId,
      spiceLevel: spiceLevel || "Medium",
      image: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
      public_id: uploadResult.public_id, // For deleting from Cloudinary
    });

    await newMenuItem.save();
    res
      .status(201)
      .json({ message: "Menu item added!", menuItem: newMenuItem });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// ✅ Update a menu item (Owner Only)
export const updateMenuItem = async (req, res) => {
  try {
    const { name, price, category, spiceLevel } = req.body;
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // ✅ If New Image, Delete Old One & Upload New
    if (req.file) {
      if (menuItem.image && menuItem.image.publicId) {
        await cloudinary.uploader.destroy(menuItem.image.publicId);
      }
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant-app/menu-items",
      });
      menuItem.image = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };  
      menuItem.public_id = uploadResult.public_id; // For deleting from Cloudinary
    }

    menuItem.name = name || menuItem.name;
    menuItem.price = price || menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.spiceLevel = spiceLevel || menuItem.spiceLevel;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete a menu item (Owner Only)
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // ✅ Delete image from Cloudinary
    if (menuItem.image && menuItem.image.publicId) {
      await cloudinary.uploader.destroy(menuItem.image.publicId);
    }

    await menuItem.deleteOne();
    res.json({ message: "Menu item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
