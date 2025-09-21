import mongoose from "mongoose";
import { ORDER_STATUSES } from "../constants/order.js";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, index: true, required: true },
    customerName: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totals: {
      subTotal: { type: Number, required: true, min: 0 },
      shipping: { type: Number, default: 0, min: 0 },
      grandTotal: { type: Number, required: true, min: 0 }
    },
    status: { type: String, enum: ORDER_STATUSES, default: "PENDING" },
    whatsappText: { type: String } // "Hello, my name is <name>."
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
