import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "../validators/product.schema.js";
import {
  createProductCtrl,
  listProductsCtrl,
  updateProductCtrl,
  deleteProductCtrl
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", listProductsCtrl); // public
router.post("/", requireAdmin, validate(createProductSchema), createProductCtrl);
router.patch("/:productId", requireAdmin, validate(updateProductSchema), updateProductCtrl);
router.delete("/:productId", requireAdmin, deleteProductCtrl);

export default router;
