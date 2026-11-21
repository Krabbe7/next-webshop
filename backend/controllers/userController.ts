// import { Request, Response } from "express";
// import { registerUserService, loginUserService } from "../services/authService";

// // REGISTER
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;

//     const user = await registerUserService(username, email, password);

//     res.status(201).json(user);
//   } catch (err: any) {
//     res.status(400).json({
//       error: err.message || "Register failed",
//     });
//   }
// };

// // LOGIN
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const data = await loginUserService(email, password);

//     res.cookie("token", data.token, {
//       httpOnly: true,
//       //Sender over HTTPS hvis sat til production, men i development (saat til nu) må den godt sende over HTTP
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({
//       user: data.user,
//     });
//   } catch (err: any) {
//     res.status(401).json({
//       error: err.message || "Login failed",
//     });
//   }
// };

// export const getUser = (req: Request, res: Response) => {
//   res.json({
//     user: (req as any).user,
//   });
// };

// export const logout = (req: Request, res: Response) => {
//   res.clearCookie("token");

//   res.json({
//     success: true,
//   });
// };
import { Request, Response } from "express";
import { z } from "zod";
import { registerUserService, loginUserService } from "../services/authService";

// Samme options bruges ved login og logout, så cookien altid kan slettes igen
const cookieOptions = {
  httpOnly: true,
  // HTTPS i production, HTTP er ok i development
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const registerSchema = z.object({
  username: z.string().trim().min(2).max(50),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(72), // bcrypt ignorerer alt efter 72 bytes
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(72),
});

// REGISTER
export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Ugyldigt input. Adgangskoden skal være mindst 8 tegn.",
    });
  }

  try {
    const { username, email, password } = parsed.data;

    const user = await registerUserService(username, email, password);

    res.status(201).json(user);
  } catch (err: any) {
    // 23505 = unik constraint (hvis du har lavet unik indeks på e-mail)
    if (err.message === "Email already exists" || err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }

    console.error("Register fejl:", err);
    res.status(500).json({ error: "Register failed" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const { email, password } = parsed.data;

    const data = await loginUserService(email, password);

    res.cookie("token", data.token, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: data.user,
    });
  } catch (err: any) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.error("Login fejl:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

export const getUser = (req: Request, res: Response) => {
  res.json({
    user: (req as any).user,
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", cookieOptions);

  res.json({
    success: true,
  });
};
