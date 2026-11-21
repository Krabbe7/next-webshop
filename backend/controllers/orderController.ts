import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import orderService from "../services/orderService";

const JWT_SECRET = process.env.JWT_SECRET as string;

const createOrderSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  phone: z.string().trim().max(30).optional(),

  streetAddress: z.string().trim().min(3).max(200),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{4}$/),
  city: z.string().trim().min(1).max(100),
  country: z.string().trim().min(1).max(100),

  shippingId: z.coerce.number().int().positive(),

  pickupPoint: z
    .object({
      id: z.string().trim().min(1).max(200),
      name: z.string().trim().max(200),
      address: z.string().trim().max(300),
    })
    .nullable()
    .optional(),

  items: z
    .array(
      z.object({
        gameId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().min(1).max(10),
      }),
    )
    .min(1)
    .max(50),
});

export async function createOrderController(req: Request, res: Response) {
  const parsed = createOrderSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Ugyldige ordreoplysninger",
    });
  }

  try {
    let userId = null;

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
      } catch (err) {
        console.log("Invalid token, continuing as guest");
      }
    }

    const orderId = await orderService.createOrder({
      ...parsed.data,
      userId,
    });

    res.status(201).json({
      success: true,
      orderId,
    });
  } catch (error: any) {
    if (error?.message === "Ikke nok på lager.") {
      return res.status(409).json({
        success: false,
        message: "Ikke nok på lager",
      });
    }

    if (
      error?.message === "Ugyldig vare" ||
      error?.message === "Ugyldig leveringsmetode"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

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

    if (order.user_id && order.user_id !== userId) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { user_id, email, ...safeOrder } = order;

    res.json(safeOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kunne ikke hente ordre" });
  }
}
