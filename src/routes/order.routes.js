import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema, updateStatusSchema } from "../validators/order.schema.js";
import {
  createOrderCtrl,
  listOrdersCtrl,
  updateOrderStatusCtrl
} from "../controllers/order.controller.js";

const router = Router();

// Public: customers create orders
router.post("/", validate(createOrderSchema), createOrderCtrl);

// Admin only
router.get("/", requireAdmin, listOrdersCtrl);
router.patch("/:orderId/status", requireAdmin, validate(updateStatusSchema), updateOrderStatusCtrl);

export default router;
