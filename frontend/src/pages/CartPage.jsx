import { Link, useNavigate } from "react-router-dom";

function CartPage({ cart, onUpdateQty, onRemove }) {
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    // Sync cart to backend before checkout
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    })
      .then(() => navigate("/order-summary"))
      .catch((err) => {
        console.error("Failed to sync cart:", err);
        navigate("/order-summary"); // Navigate anyway
      });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>🛒 Your Cart</h2>
        <div className="cart-empty">
          <span className="empty-icon">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products yet.</p>
          <Link to="/products" className="btn-secondary">
            🛍️ Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      <p className="cart-subtitle">{totalItems} item{totalItems > 1 ? "s" : ""} in your cart</p>

      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-emoji">{item.image}</div>

              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">₹{item.price} / unit</div>
              </div>

              <div className="cart-item-controls">
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQty(item.id, -1)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQty(item.id, 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>

              <button
                className="btn-remove"
                onClick={() => onRemove(item.id)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span className="total-price">₹{total}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            📦 Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="btn-secondary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.8rem" }}
          >
            🛍️ Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
