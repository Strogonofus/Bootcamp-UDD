import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "name, email, password are required" });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ ok: false, message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });

    const token = signToken(user);
    return res.status(201).json({
      ok: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ ok: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ ok: false, message: "Invalid credentials" });

    const token = signToken(user);
    return res.json({
      ok: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

export async function verifyToken(req, res) {
  // Si llegó acá, el middleware authRequired ya validó el token.
  return res.json({ ok: true, user: req.user });
}

export async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body || {};
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email.toLowerCase();
    if (password) updates.passwordHash = await bcrypt.hash(password, 10);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ ok: false, message: "No fields to update" });
    }

    // Evitar que dos usuarios usen el mismo email
    if (updates.email) {
      const exists = await User.findOne({ email: updates.email, _id: { $ne: req.user.id } });
      if (exists) return res.status(409).json({ ok: false, message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    return res.json({ ok: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}