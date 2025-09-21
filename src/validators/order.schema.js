import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      qty: z.number().int().positive()
    })
  ).min(1, "At least one item is required")
});

export const updateStatusSchema = z.object({
  status: z.enum(["PENDING","SHIPPED","DELIVERED"])
});
