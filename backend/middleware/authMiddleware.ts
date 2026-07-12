// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export function authMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const header = req.headers.authorization;

//   if (!header) {
//     return res.status(401).json({
//       error: "No token",
//     });
//   }

//   const token = header.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     (req as any).user = decoded;

//     next();
//   } catch {
//     return res.status(401).json({
//       error: "Invalid token",
//     });
//   }
// }
// export function requireAdmin(req: Request, res: Response, next: NextFunction) {
//   if ((req as any).user.role !== "admin") {
//     return res.status(403).json({
//       error: "Forbidden",
//     });
//   }

//   next();
// }
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtUser {
  id: number;
  role: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      error: "No token",
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUser;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  next();
}
