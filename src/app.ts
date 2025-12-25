import express from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ordersRoutes } from "./modules/orders/orders.routes";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

app.use(errorMiddleware);
