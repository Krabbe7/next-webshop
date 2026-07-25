import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import gameRoute from "./routes/gameRoute";
import userRoute from "./routes/userRoute";
import shippingRoute from "./routes/shippingRoute";
import orderRoute from "./routes/orderRoute";
import ratingRoute from "./routes/ratingRoute";
import favoriteRoute from "./routes/favoriteRoute";

import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/games", gameRoute);
app.use("/api/users", userRoute);
app.use("/api/shipping", shippingRoute);
app.use("/api/orders", orderRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/favorites", favoriteRoute);

// Beskyt admin-ruter
app.use("/api/admin", authMiddleware);

// Health check
app.get("/api", (req, res) => {
  res.json({
    message: "Game API running 🚀",
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Server running on http://localhost:${PORT}`);
});
