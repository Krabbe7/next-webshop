import express from "express";
import {
  getProductCategoriesController,
  getProductCategoryByIdController,
  createProductCategoryController,
  updateproductCategoryController,
  deleteproductCategoryController,
} from "../controllers/productCategoriesController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const productCategoryRoute = express.Router();

productCategoryRoute.get("/", getProductCategoriesController);
productCategoryRoute.get("/:id", getProductCategoryByIdController);
productCategoryRoute.post(
  "/",
  authMiddleware,
  requireAdmin,
  createProductCategoryController,
);
productCategoryRoute.put(
  "/:id",
  authMiddleware,
  requireAdmin,
  updateproductCategoryController,
);
productCategoryRoute.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deleteproductCategoryController,
);

export default productCategoryRoute;
