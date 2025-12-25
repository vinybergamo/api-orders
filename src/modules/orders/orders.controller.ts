import { Request, Response } from "express";
import { OrdersService } from "./orders.service";

export class OrdersController {
  static async createOrder(req: Request, res: Response) {
    const order = await OrdersService.createOrder(req.body);
    res.status(201).json(order);
  }
}
