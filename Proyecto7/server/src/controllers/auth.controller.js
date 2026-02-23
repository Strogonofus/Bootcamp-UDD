import User from "../models/User.js";
import { hashPassword, comparePassword } from "../services/hash.service.js";
import { signToken } from "../services/token.service.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ success: false, message: "Email already in use" });

    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
    });

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    res.status(201).json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    res.json({ success: true, data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (err) {
    next(err);
  }
}