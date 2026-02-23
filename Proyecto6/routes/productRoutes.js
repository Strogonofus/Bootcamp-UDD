import { Router } from "express";
import {
  createProduct,
  readAllProducts,
  readOneProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/create", authRequired, createProduct);
router.get("/readall", readAllProducts);
router.get("/readone/:id", readOneProduct);
router.put("/update/:id", authRequired, updateProduct);
router.delete("/delete/:id", authRequired, deleteProduct);

export default router;