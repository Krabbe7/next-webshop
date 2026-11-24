import { Request, Response } from "express";
import * as productCategoriesService from "../services/productCategoriesService";

export const getProductCategoriesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const productCategories =
      await productCategoriesService.getAllProductCategories();

    res.json(productCategories);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getProductCategoryByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const productCategory =
      await productCategoriesService.getProductCategoryById(Number(id));

    if (!productCategory) {
      return res.status(404).json({
        error: "productCategory not found",
      });
    }

    res.json(productCategory);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const createProductCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name } = req.body;

    const productCategory =
      await productCategoriesService.createProductCategory(name);

    res.status(201).json(productCategory);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const updateproductCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const productCategory =
      await productCategoriesService.updateProductCategory(Number(id), name);

    if (!productCategory) {
      return res.status(404).json({
        error: "productCategory not found",
      });
    }

    res.json(productCategory);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update productCategory",
    });
  }
};

export const deleteproductCategoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const productCategory =
      await productCategoriesService.deleteProductCategory(Number(id));

    if (!productCategory) {
      return res.status(404).json({
        error: "productCategory not found",
      });
    }

    res.json(productCategory);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
