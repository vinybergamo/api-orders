import { Request, Response } from "express";
import { OrdersService } from "./orders.service";
import { OrderState } from "../../types/order.type";

export class OrdersController {
  static async createOrder(req: Request, res: Response) {
    const order = await OrdersService.createOrder(req.body);
    res.status(201).json(order);
  }

  static async listOrders(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const state = req.query.state as OrderState;

    const orders = await OrdersService.listOrders({ page, limit, state });
    res.status(200).json(orders);
  }

  static async advanceOrder(req: Request, res: Response) {
    const order = await OrdersService.advanceOrder(req.params.id as string);
    res.status(200).json(order);
  }
}
