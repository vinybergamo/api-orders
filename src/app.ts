import express from "express";
import { authRoutes } from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ordersRoutes } from "./modules/orders/orders.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

app.use(errorMiddleware);
