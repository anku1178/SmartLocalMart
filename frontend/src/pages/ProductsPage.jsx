import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["All", "Grains", "Oils", "Daily Essentials"];

function ProductsPage({ cart, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-header">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>🛍️ Fresh Products</h2>
        <p>Browse our daily essentials at the best prices</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "All" && "📦 "}
            {cat === "Grains" && "🌾 "}
            {cat === "Oils" && "🫒 "}
            {cat === "Daily Essentials" && "🧴 "}
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              isInCart={isInCart(product.id)}
            />
          ))
        ) : (
          <div className="no-results">
            <span className="no-icon">🔍</span>
            <p>No products found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
