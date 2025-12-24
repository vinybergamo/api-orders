import { Router } from "express";
import { AuthController } from "./auth.controller";
import z from "zod";
import { validateBodyMiddleware } from "../../middlewares/validate.middleware";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validateBodyMiddleware(registerSchema),
  AuthController.register
);
authRoutes.post(
  "/login",
  validateBodyMiddleware(loginSchema),
  AuthController.login
);
