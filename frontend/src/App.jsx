import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";

import "./style.css";

function App() {
  const [username, setUsername] = useState("");
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = useCallback((message) => {
    setToast(null);
    // Small delay to re-trigger animation
    setTimeout(() => setToast(message), 50);
  }, []);

  // Add product to cart
  const handleAddToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          showToast(`${product.name} quantity updated!`);
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        showToast(`${product.name} added to cart!`);
        return [...prev, { ...product, quantity: 1 }];
      });
    },
    [showToast]
  );

  // Update item quantity in cart
  const handleUpdateQty = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Remove item from cart
  const handleRemove = useCallback(
    (productId) => {
      setCart((prev) => {
        const item = prev.find((i) => i.id === productId);
        if (item) showToast(`${item.name} removed from cart`);
        return prev.filter((i) => i.id !== productId);
      });
    },
    [showToast]
  );

  // Clear cart after order
  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Total items count for badge
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <Navbar cartCount={cartCount} username={username} />

      <Routes>
        <Route
          path="/"
          element={<HomePage onSetUsername={setUsername} />}
        />
        <Route
          path="/products"
          element={
            <ProductsPage cart={cart} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQty={handleUpdateQty}
              onRemove={handleRemove}
            />
          }
        />
        <Route
          path="/order-summary"
          element={
            <OrderSummaryPage
              username={username}
              cart={cart}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>

      {/* Toast notifications */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </Router>
  );
}

export default App;
