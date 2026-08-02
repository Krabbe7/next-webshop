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

    res.cookie("token", data.token, {
      httpOnly: true,
      //Sender over HTTPS hvis sat til production, men i development (saat til nu) må den godt sende over HTTP
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: data.user,
    });
  } catch (err: any) {
    res.status(401).json({
      error: err.message || "Login failed",
    });
  }
};

export const getUser = (req: Request, res: Response) => {
  res.json({
    user: (req as any).user,
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");

  res.json({
    success: true,
  });
};
