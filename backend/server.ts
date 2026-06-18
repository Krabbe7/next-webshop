import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import gameRoute from "./routes/gameRoute";
import userRoute from "./routes/userRoute";
<<<<<<< Updated upstream
=======
import { authMiddleware } from "./middleware/authMiddleware";
import deliveryMethodRoute from "./routes/deliveryMethodsRoute";
>>>>>>> Stashed changes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/games", gameRoute);
app.use("/api/users", userRoute);
<<<<<<< Updated upstream
=======
app.use("/api/deliveryMethods", deliveryMethodRoute);
app.use("/api/admin", authMiddleware);
>>>>>>> Stashed changes

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
