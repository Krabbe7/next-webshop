import { Request, Response } from "express";
import shippingService from "../services/shippingService";

export const getPickupPointsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { address, provider } = req.body;

    if (!address) {
      return res.status(400).json({
        error: "Address is required",
      });
    }

    const points = await shippingService.getPickupPoints(address, provider);

    res.json({
      points,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch pickup points",
    });
  }
};
