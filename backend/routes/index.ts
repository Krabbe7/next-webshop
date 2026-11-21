import { Router } from "express";

import gameRoute from "./gameRoute";
import userRoute from "./userRoute";
import shippingRoute from "./shippingRoute";
import orderRoute from "./orderRoute";
import ratingRoute from "./ratingRoute";
import favoriteRoute from "./favoriteRoute";
import employeeRoute from "./employeeRoute";
import platformRoute from "./platformRoutes";
import genreRoute from "./genreRoute";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use("/games", gameRoute);
router.use("/users", userRoute);
router.use("/shipping", shippingRoute);
router.use("/orders", orderRoute);
router.use("/rating", ratingRoute);
router.use("/favorites", favoriteRoute);
router.use("/employees", employeeRoute);
router.use("/platforms", platformRoute);
router.use("/genres", genreRoute);

// Beskyt admin-ruter
router.use("/admin", authMiddleware);

// Health check
router.get("/", (req, res) => {
  res.json({
    message: "Game API running",
    status: "OK",
  });
});

export default router;
