import z from "zod";
import { Order } from "../../models/order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { HttpException } from "../../exceptions/http.exception";
import { OrderState } from "../../types/order.type";

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

  static async listOrders({
    page = 1,
    limit = 10,
    state,
  }: {
    page?: number;
    limit?: number;
    state?: OrderState;
  }) {
    const filter: {
      state?: OrderState;
      status: string;
    } = { status: "ACTIVE" };

    if (state) filter.state = state;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Order.find(filter).skip(skip).limit(limit),
      Order.countDocuments(filter),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async advanceOrder(id: string) {
    const order = await Order.findById(id);

    if (!order) {
      throw new HttpException(
        404,
        "NOT_FOUND",
        "ORDER_NOT_FOUND",
        "Order not found"
      );
    }

    const flow = {
      CREATED: OrderState.ANALYSIS,
      ANALYSIS: OrderState.COMPLETED,
    } as const;

    const next = flow[order.state as keyof typeof flow];

    if (!next) {
      throw new HttpException(
        400,
        "BAD_REQUEST",
        "VALIDATION_ERROR",
        "Invalid order state"
      );
    }

    order.state = next;
    await order.save();
    return order;
  }
}
