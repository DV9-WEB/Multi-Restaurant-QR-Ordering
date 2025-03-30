import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../db/cloudinary.js";

const foodStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "restaurant-app/food-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const restaurantStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "restaurant-app/restaurant-images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadFoodImage = multer({ storage: foodStorage });
const uploadRestaurantImage = multer({ storage: restaurantStorage });

export { uploadFoodImage, uploadRestaurantImage };
