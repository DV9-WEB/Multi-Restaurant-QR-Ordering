import express from "express";
import { subscribeOwner } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, subscribeOwner);

export default router;
