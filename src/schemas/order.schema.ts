import mongoose from "mongoose";
import { OrderState } from "../types/order.type";
import { ServiceSchema } from "./service.schema";

export const OrderSchema = new mongoose.Schema(
  {
    lab: String,
    patient: String,
    customer: String,
    state: {
      type: String,
      enum: Object.values(OrderState),
      default: OrderState.CREATED,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DELETED"],
      default: "ACTIVE",
    },
    services: {
      type: [ServiceSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
