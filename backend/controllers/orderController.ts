import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import orderService from "../services/orderService";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function createOrderController(req: Request, res: Response) {
  try {
    let userId = null;

    // Læs tokenet fra cookien (login kører via cookie), med fallback til Authorization-header
    const token =
      req.cookies?.token ?? req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
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

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getOrderByIdController(req: Request, res: Response) {
  try {
    const id = String(req.params.id);

    if (!UUID_RE.test(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find evt. indlogget bruger (valgfrit login)
    let userId: number | null = null;
    const token = req.cookies?.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        userId = decoded.id;
      } catch {
        // ugyldigt token: behandles som gæst
      }
    }

    // Ordre med ejer må kun ses af ejeren (404 for ikke at afsløre, at den findes)
    if (order.user_id && order.user_id !== userId) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Returnér ikke mere end siden bruger
    const { user_id, email, ...safeOrder } = order;

    res.json(safeOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kunne ikke hente ordre" });
  }
}
