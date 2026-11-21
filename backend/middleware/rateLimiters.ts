import { Express } from "express";
import rateLimit from "express-rate-limit";

const base = {
  standardHeaders: true,
  legacyHeaders: false,
} as const;

// Generel grænse for hele API'et
const apiLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 300,
});

// Google-kald koster penge
const pickupLimiter = rateLimit({
  ...base,
  windowMs: 60 * 1000,
  limit: 10,
  message: { error: "For mange forespørgsler, prøv igen om lidt." },
});

// Brute force på login og registrering
const authLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  message: { error: "For mange forsøg, prøv igen senere." },
});

// Oprettelse af ordrer
const orderLimiter = rateLimit({
  ...base,
  windowMs: 60 * 60 * 1000,
  limit: 20,
});

export function applyRateLimiters(app: Express) {
  app.use("/api", apiLimiter);
  app.use("/api/shipping/pickup-points", pickupLimiter);
  app.use("/api/users/login", authLimiter);
  app.use("/api/users/register", authLimiter);
  app.post("/api/orders", orderLimiter);
}
