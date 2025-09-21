import { asyncHandler } from "../utils/asyncHandler.js";
import { createOrder, listOrders, updateOrderStatus } from "../services/order.service.js";

export const createOrderCtrl = asyncHandler(async (req, res) => {
  const { doc, waLink } = await createOrder(req.validated);
  res.status(201).json({ ok:true, orderId: doc.orderId, waLink });
});

export const listOrdersCtrl = asyncHandler(async (req, res) => {
  const data = await listOrders(req.query);
  res.json({ ok:true, ...data });
});

export const updateOrderStatusCtrl = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.validated;
  const updated = await updateOrderStatus(orderId, status);
  res.json({ ok:true, order: updated });
});
