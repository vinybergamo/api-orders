import { Router } from "express";
import { OrdersService } from "./orders.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { CreateOrderDto } from "./dto/create-order.dto";
import { validateBodyMiddleware } from "../../middlewares/validate.middleware";
import { OrdersController } from "./orders.controller";

export const ordersRoutes = Router();

ordersRoutes.use(authMiddleware);

ordersRoutes.post(
  "/",
  validateBodyMiddleware(CreateOrderDto),
  OrdersController.createOrder
);
ordersRoutes.get("/", OrdersController.listOrders);
ordersRoutes.patch("/:id/advance", OrdersController.advanceOrder);
