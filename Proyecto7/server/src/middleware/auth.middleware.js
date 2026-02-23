import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET); // normalmente trae { id, ... }

    // Cargar usuario real desde DB (incluye role actual)
    const user = await User.findById(payload.id).select("email role");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}