import { asyncHandler } from "../utils/asyncHandler.js";
import { createProduct, listProducts, updateProduct, deleteProduct } from "../services/product.service.js";

export const createProductCtrl = asyncHandler(async (req, res) => {
  const product = await createProduct(req.validated);
  res.status(201).json({ ok:true, product });
});

export const listProductsCtrl = asyncHandler(async (req, res) => {
  const data = await listProducts(req.query);
  res.json({ ok:true, ...data });
});

export const updateProductCtrl = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await updateProduct(productId, req.validated);
  if (!product) return res.status(404).json({ ok:false, error:"Not found" });
  res.json({ ok:true, product });
});

export const deleteProductCtrl = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);
  if (!product) return res.status(404).json({ ok:false, error:"Not found" });
  res.json({ ok:true, product });
});
