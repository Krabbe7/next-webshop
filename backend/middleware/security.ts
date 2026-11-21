import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "../config/env";

export function applySecurity(app: Express) {
  app.use(helmet());

  app.use(
    cors({
      origin: env.frontendUrl,
      credentials: true,
    }),
  );

  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());
}
