import { Request, Response } from "express";
import { pool } from "../db";
import employeeService from "../services/employeeService";

export const getEmployeesController = async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();

    res.json(employees);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const createEmployeeController = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.createEmployee(req.body);

    res.status(201).json(employee);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};

export const getEmployeeByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(Number(id));
    if (!employee) {
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await employeeService.updateemployee(Number(id), req.body);

    if (!employee) {
      return res.status(404).json({
        error: "Game not found",
      });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update employee",
    });
  }
};
export const deleteEmployeeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.deleteemployee(Number(id));
    if (!employee) {
      return res.status(404).json({
        error: "Employee  not found",
      });
    }

    res.json(employee);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "DB error",
    });
  }
};
