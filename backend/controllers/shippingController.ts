import { Request, Response } from "express";
import shippingService from "../services/shippingService";

export const getShippingController = async (req: Request, res: Response) => {
  try {
    const shipping = await shippingService.getAllShipping();

    res.json(shipping);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getShippingByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const shipping = await shippingService.getShippingById(Number(id));

    if (!shipping) {
      return res.status(404).json({
        error: "Shipping method not found",
      });
    }

    res.json(shipping);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const updateShippingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const shipping = await shippingService.updateShipping(Number(id), req.body);

    if (!shipping) {
      return res.status(404).json({
        error: "Shipping method not found",
      });
    }

    res.json(shipping);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update shipping method",
    });
  }
};

export const createShippingController = async (req: Request, res: Response) => {
  try {
    const shipping = await shippingService.createShipping(req.body);

    if (!shipping) {
      return res.status(404).json({
        error: "Shipping method not found",
      });
    }

    res.json(shipping);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to create shipping method",
    });
  }
};

export const deleteShippingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const shippingMethod = await shippingService.deleteShipping(Number(id));
    if (!shippingMethod) {
      return res.status(404).json({
        error: "Shipping Method not found",
      });
    }

    res.json(shippingMethod);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

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
