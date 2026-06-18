import { Request, Response } from "express";
import { pool } from "../db";
import deliveryMethodsService from "../services/deliveryMethodsService";

export const getDeliveryCouriersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const deliveryMethods = await deliveryMethodsService.getDeliveryMethods();

    res.json(deliveryMethods);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const createDeliveryMethodcontroller = async (
  req: Request,
  res: Response,
) => {
  try {
    const deliveryMethod = await deliveryMethodsService.createDeliveryMethod(
      req.body,
    );

    res.status(201).json(deliveryMethod);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getDeliveryMethodIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const deliveryMethod = await deliveryMethodsService.getDeliveryMethodId(
      Number(id),
    );
    if (!deliveryMethod) {
      return res.status(404).json({
        error: "delivery method not found",
      });
    }

    res.json(deliveryMethod);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
export const updateDeliveryMethod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deliveryMethod = await deliveryMethodsService.updateDeliveryMethod(
      Number(id),
      req.body,
    );

    if (!deliveryMethod) {
      return res.status(404).json({
        error: "delivery method not found",
      });
    }

    res.json(deliveryMethod);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update delivery method",
    });
  }
};
export const deleteDeliveryMethodController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const deliveryMethod = await deliveryMethodsService.deleteDeliveryMethod(
      Number(id),
    );
    if (!deliveryMethod) {
      return res.status(404).json({
        error: "delivery method not found",
      });
    }

    res.json(deliveryMethod);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
