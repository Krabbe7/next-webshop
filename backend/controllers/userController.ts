import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await registerUserService(username, email, password);

    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({
      error: err.message || "Register failed",
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUserService(email, password);

    res.json(data);
  } catch (err: any) {
    res.status(401).json({
      error: err.message || "Login failed",
    });
  }
};
