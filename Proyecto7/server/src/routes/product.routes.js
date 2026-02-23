import { Router } from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);

// Admin only
router.post("/", requireAuth, requireRole("admin"), createProduct);
router.put("/:id", requireAuth, requireRole("admin"), updateProduct);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProduct);

export default router;