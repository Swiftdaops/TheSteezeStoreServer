import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true, index: true, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    description: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
