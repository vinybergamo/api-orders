import express from "express";
import { authRoutes } from "./modules/auth/auth.routes";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
