import { Product } from "../models/Product.js";
import { genId } from "../utils/id.js";

export const createProduct = async (payload) => {
  const productId = genId("prd");
  return Product.create({ productId, ...payload });
};

export const listProducts = async ({ q, isActive, page=1, limit=20 }) => {
  const filter = {};
  if (typeof isActive !== "undefined") filter.isActive = isActive === "true";
  if (q) filter.name = { $regex: q, $options: "i" };
  const skip = (page-1)*limit;
  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(+limit),
    Product.countDocuments(filter)
  ]);
  return { items, total, page: +page, limit: +limit };
};

export const updateProduct = async (productId, payload) => {
  return Product.findOneAndUpdate({ productId }, payload, { new: true });
};

export const deleteProduct = async (productId) => {
  return Product.findOneAndDelete({ productId });
};

export const findProductsByIds = async (ids=[]) => {
  return Product.find({ productId: { $in: ids } });
};
