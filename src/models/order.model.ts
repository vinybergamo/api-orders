import mongoose from "mongoose";
import { OrderSchema } from "../schemas/order.schema";

export const Order = mongoose.model("Order", OrderSchema);
