import Product from "../models/Product.js";

export async function listProducts(req, res, next) {
  try {
    const products = await Product.find({ active: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: p });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const p = await Product.create(req.body);
    res.status(201).json({ success: true, data: p });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: p });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!p) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
}