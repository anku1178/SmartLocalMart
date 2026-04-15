const express = require("express");
const cors = require("cors");
const products = require("./products");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cart storage
let cart = [];

// ──────────────────────────────────────
// API ENDPOINTS
// ──────────────────────────────────────

// GET /products — Returns all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET /cart — Returns current cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// POST /cart — Stores cart items (replaces entire cart)
app.post("/cart", (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid cart data. Send { items: [...] }" });
  }

  cart = items;
  res.json({ message: "Cart updated successfully", cart });
});

// POST /order — Place an order (UI-only, clears cart)
app.post("/order", (req, res) => {
  const { username, items, total } = req.body;

  if (!username || !items || !total) {
    return res.status(400).json({ error: "Missing order data" });
  }

  console.log(`\n🛒 New Order Received!`);
  console.log(`   Customer: ${username}`);
  console.log(`   Items: ${items.length}`);
  console.log(`   Total: ₹${total}`);
  console.log(`   Time: ${new Date().toLocaleString()}\n`);

  // Clear cart after order
  cart = [];

  res.json({
    message: "Order placed successfully!",
    orderId: "ORD-" + Date.now(),
    username,
    total,
  });
});

// ──────────────────────────────────────
// START SERVER
// ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🟢 Smart Local Mart Backend`);
  console.log(`   Server running on http://localhost:${PORT}`);
  console.log(`   Products loaded: ${products.length}\n`);
});
