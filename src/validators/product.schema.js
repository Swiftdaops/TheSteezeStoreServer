import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  images: z.array(z.string().url()).optional().default([]),
  description: z.string().optional(),
  isActive: z.boolean().optional()
});

export const updateProductSchema = createProductSchema.partial();
