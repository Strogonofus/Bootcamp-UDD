import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { myOrders } from "../controllers/order.controller.js";

const router = Router();
router.get("/mine", requireAuth, myOrders);

export default router;