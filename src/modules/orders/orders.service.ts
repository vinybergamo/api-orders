import z from "zod";
import { Order } from "../../models/order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { HttpException } from "../../exceptions/http.exception";

export class OrdersService {
  static async createOrder(createOrderDto: z.infer<typeof CreateOrderDto>) {
    if (!createOrderDto?.services?.length) {
      throw new HttpException(
        400,
        "BAD_REQUEST",
        "VALIDATION_ERROR",
        "Services is required"
      );
    }

    const total = createOrderDto.services.reduce(
      (acc, service) => acc + service.value,
      0
    );

    if (total <= 0) {
      throw new HttpException(
        400,
        "BAD_REQUEST",
        "VALIDATION_ERROR",
        "Total must be greater than 0"
      );
    }

    const order = await Order.create(createOrderDto);
    return order;
  }
}
