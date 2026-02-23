import Product from "../models/productModel.js";

export async function createProduct(req, res) {
  try {
    const { name, description, price } = req.body || {};
    if (!name || price === undefined) {
      return res.status(400).json({ ok: false, message: "name and price are required" });
    }

    const product = await Product.create({
      user: req.user.id,
      name,
      description: description || "",
      price
    });

    return res.status(201).json({ ok: true, product });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

export async function readAllProducts(req, res) {
  try {
    const products = await Product.find().populate("user", "name email");
    return res.json({ ok: true, products });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

export async function readOneProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("user", "name email");
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });

    return res.json({ ok: true, product });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body || {};

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });

    // Autorización: solo el dueño puede editar
    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ ok: false, message: "Not allowed" });
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;

    await product.save();
    return res.json({ ok: true, product });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ ok: false, message: "Product not found" });

    // Autorización: solo el dueño puede borrar
    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ ok: false, message: "Not allowed" });
    }

    await Product.findByIdAndDelete(id);
    return res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
}