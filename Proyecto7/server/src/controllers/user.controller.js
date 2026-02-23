import User from "../models/User.js";

export async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}