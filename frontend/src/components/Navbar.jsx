import { Link, useLocation } from "react-router-dom";

function Navbar({ cartCount, username }) {
  const location = useLocation();

  // Don't show navbar on home page
  if (location.pathname === "/") return null;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🛒</span>
        Smart Local Mart
      </Link>

      <div className="navbar-links">
        {username && (
          <div className="welcome-badge">
            <span className="user-icon">👤</span>
            {username}
          </div>
        )}

        <Link
          to="/products"
          className={`nav-link ${location.pathname === "/products" ? "active" : ""}`}
        >
          🛍️ Products
        </Link>

        <Link to="/cart" className="cart-icon-wrapper">
          <span className="cart-icon">🛒</span>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
