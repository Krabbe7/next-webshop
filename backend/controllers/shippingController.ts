import { Request, Response } from "express";
import { z } from "zod";
import shippingService from "../services/shippingService";

const shippingSchema = z.object({
  name: z.string().trim().min(1).max(50),
  price: z.coerce.number().min(0).max(10000),
});

const pickupSchema = z.object({
  address: z.string().trim().min(5).max(200),
  provider: z.coerce.number().int().positive(),
});

function parseId(value: unknown): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

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
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const shipping = await shippingService.getShippingById(id);

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
  const id = parseId(req.params.id);
  const parsed = shippingSchema.safeParse(req.body);

  if (!id || !parsed.success) {
    return res.status(400).json({
      error: "Ugyldigt input. Navn er påkrævet, og prisen skal være et tal.",
    });
  }

  try {
    const shipping = await shippingService.updateShipping(id, parsed.data);

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
  const parsed = shippingSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Ugyldigt input. Navn er påkrævet, og prisen skal være et tal.",
    });
  }

  try {
    const shipping = await shippingService.createShipping(parsed.data);

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
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const shippingMethod = await shippingService.deleteShipping(id);

    if (!shippingMethod) {
      return res.status(404).json({
        error: "Shipping Method not found",
      });
    }

    res.json(shippingMethod);
  } catch (err: any) {
    // 23503 = fremmednøgle: leverandøren er brugt i en ordre
    if (err?.code === "23503") {
      return res.status(409).json({
        error: "Leverandøren er brugt i ordrer og kan ikke slettes.",
      });
    }

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
  const parsed = pickupSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Ugyldigt input",
    });
  }

  try {
    const { address, provider } = parsed.data;

    const points = await shippingService.getPickupPoints(address, provider);

    res.json({
      points,
    });
  } catch (err: any) {
    if (err?.message === "Unknown provider") {
      return res.status(400).json({ error: "Unknown provider" });
    }

    console.error(err);

    res.status(500).json({
      error: "Failed to fetch pickup points",
    });
  }
};
