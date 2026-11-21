// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";

// import gameRoute from "./routes/gameRoute";
// import userRoute from "./routes/userRoute";
// import shippingRoute from "./routes/shippingRoute";
// import orderRoute from "./routes/orderRoute";
// import ratingRoute from "./routes/ratingRoute";
// import favoriteRoute from "./routes/favoriteRoute";
// import employeeRoute from "./routes/employeeRoute";

// import { authMiddleware } from "./middleware/authMiddleware";

// import cookieParser from "cookie-parser";
// import platformRoute from "./routes/platformRoutes";
// import genreRoute from "./routes/genreRoute";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }),
// );
// app.use(cookieParser());
// // Routes
// app.use("/api/games", gameRoute);
// app.use("/api/users", userRoute);
// app.use("/api/shipping", shippingRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/rating", ratingRoute);
// app.use("/api/favorites", favoriteRoute);
// app.use("/api/employees", employeeRoute);
// app.use("/api/platforms", platformRoute);
// app.use("/api/genres", genreRoute);

// // Beskyt admin-ruter
// app.use("/api/admin", authMiddleware);

// // Health check
// app.get("/api", (req, res) => {
//   res.json({
//     message: "Game API running",
//     status: "OK",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
