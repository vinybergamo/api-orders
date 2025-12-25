import mongoose from "mongoose";

export const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
    default: "PENDING",
  },
});
