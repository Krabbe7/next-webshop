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

export async function getMyOrdersController(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const orders = await orderService.getOrdersByUser(req.user.id);

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke hente ordrer",
    });
  }
}

export async function getOrderByIdController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Kunne ikke hente ordre",
    });
  }
}
