import { Router } from "express";
import { register, login, verifyToken, updateUser } from "../controllers/userController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verifytoken", authRequired, verifyToken);
router.put("/update", authRequired, updateUser);

export default router;