import "./config/env";

import express from "express";

import { applySecurity } from "./middleware/security";
import { applyRateLimiters } from "./middleware/rateLimiters";
import apiRoutes from "./routes";

const app = express();

applySecurity(app);
applyRateLimiters(app);
app.use("/api", apiRoutes);

export default app;
