import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Routes
//import x from "./routes/x";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes (WEB SHOP API)
//app.use("/api/products", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Webshop API running on http://localhost:${PORT}`);
});
