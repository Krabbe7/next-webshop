import express from "express";
import {
  getEmployeesController,
  getEmployeeByIdController,
  createEmployeeController,
  updateEmployee,
  deleteEmployeeController,
} from "../controllers/employeeController";
import { authMiddleware, requireAdmin } from "../middleware/authMiddleware";

const employeeRoute = express.Router();

employeeRoute.get("/", getEmployeesController);

employeeRoute.get("/:id", getEmployeeByIdController);

employeeRoute.post("/", authMiddleware, requireAdmin, createEmployeeController);

employeeRoute.put("/:id", authMiddleware, requireAdmin, updateEmployee);

employeeRoute.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  deleteEmployeeController,
);

export default employeeRoute;
