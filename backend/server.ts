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

// Routes
//app.use("/api/products", productRoutes);

// Start server
app.get("/api", (req, res) => {
  res.json({
    message: "Webshop backend running",
    status: "OK",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Webshop db running on http://localhost:${PORT}`);
});
