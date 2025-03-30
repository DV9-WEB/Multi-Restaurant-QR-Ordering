import express from "express";
const app = express();

import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // ✅ HTTP server for WebSockets
import { Server } from "socket.io"; // ✅ Socket.io for real-time communication
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import { EventEmitter } from "events";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import kitchenRoutes from "./routes/kitchenRoutes.js";
EventEmitter.defaultMaxListeners = 20;

// ✅ Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Now use __dirname correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dotenv.config();

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS
app.use(errorHandler);

const server = http.createServer(app); // ✅ Create HTTP Server
const io = new Server(server, {
  cors: {
    origin: "*", // ✅ Allow all frontend origins (Change in Production)
  },
});

io.on("connection", (socket) => {
  console.log("⚡ Kitchen Monitor Connected:", socket.id);

  socket.on("joinRestaurant", (restaurantId) => {
    socket.join(`restaurant_${restaurantId}`);
    console.log(`🔗 Joined room: restaurant_${restaurantId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Kitchen Monitor Disconnected:", socket.id);
  });
});


// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/restaurants", restaurantRoutes); // Restaurant management
app.use("/api/menu", menuRoutes); // Menu management
app.use("/api/orders", orderRoutes); // Order management
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/kitchen", kitchenRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export { io }
