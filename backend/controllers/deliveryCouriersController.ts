import { Request, Response } from "express";
import { pool } from "../db";
import deliveryCouriersService from "../services/deliveryCouriersService";

export const getDeliveryCouriersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const games = await deliveryCouriersService.getDeliveryCouriers();

    res.json(games);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
