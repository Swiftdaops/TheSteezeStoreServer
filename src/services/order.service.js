import { Order } from "../models/Order.js";
import { genId } from "../utils/id.js";
import { findProductsByIds } from "./product.service.js";
import { buildWhatsAppLink } from "./whatsapp.service.js";

export const createOrder = async ({ customerName, items }) => {
  // Fetch product snapshots for reliable pricing
  const ids = items.map(i => i.productId);
  const dbProducts = await findProductsByIds(ids);
  const map = new Map(dbProducts.map(p => [p.productId, p]));

  const orderItems = items.map(({ productId, qty }) => {
    const p = map.get(productId);
    if (!p || !p.isActive) throw new Error(`Product unavailable: ${productId}`);
    return { productId, name: p.name, qty, unitPrice: p.price };
  });

  const subTotal = orderItems.reduce((s, it) => s + it.qty * it.unitPrice, 0);
  const shipping = 0;
  const grandTotal = subTotal + shipping;

  const { text: whatsappText, waLink } = buildWhatsAppLink(customerName);
  const orderId = genId("ord");

  const doc = await Order.create({
    orderId,
    customerName,
    items: orderItems,
    totals: { subTotal, shipping, grandTotal },
    status: "PENDING",
    whatsappText
  });

  return { doc, waLink };
};

export const listOrders = async ({ status, page=1, limit=20 }) => {
  const filter = {};
  if (status) filter.status = status;
  const skip = (page-1)*limit;
  const [items, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(+limit),
    Order.countDocuments(filter)
  ]);
  return { items, total, page:+page, limit:+limit };
};

export const updateOrderStatus = async (orderId, status) => {
  const doc = await Order.findOneAndUpdate({ orderId }, { status }, { new: true });
  if (!doc) throw Object.assign(new Error("Order not found"), { status: 404 });
  return doc;
};
