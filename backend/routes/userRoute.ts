import express from "express";
import { register, login, getUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoute = express.Router();

// auth routes
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/user", authMiddleware, getUser);
userRoute.get("/", authMiddleware, (req, res) => {
  res.json({
    user: (req as any).user,
  });
});

export default userRoute;
