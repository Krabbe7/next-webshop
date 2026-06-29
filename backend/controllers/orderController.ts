import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import orderService from "../services/orderService";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function createOrderController(req: Request, res: Response) {
  try {
    let userId = null;

    const authHeader = req.headers.authorization;

    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as {
          id: number;
          email: string;
          role: string;
        };

        userId = decoded.id;

        console.log("Logged in user:", userId);
      } catch (err) {
        console.log("Invalid token, continuing as guest");
      }
    }

    const orderId = await orderService.createOrder({
      ...req.body,
      userId,
    });

    res.status(201).json({
      success: true,
      orderId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Kunne ikke oprette ordre",
    });
  }
}
