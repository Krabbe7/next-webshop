import express from "express";
import { getPickupPointsController } from "../controllers/shippingController";

const shippingRoute = express.Router();

shippingRoute.post("/pickup-points", getPickupPointsController);

export default shippingRoute;
