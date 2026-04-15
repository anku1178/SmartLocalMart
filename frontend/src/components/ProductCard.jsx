function ProductCard({ product, onAddToCart, isInCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-category-badge">{product.category}</span>
        {product.image}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">
            ₹{product.price} <span>/ unit</span>
          </div>
          <button
            className={`btn-add-cart ${isInCart ? "added" : ""}`}
            onClick={() => onAddToCart(product)}
          >
            {isInCart ? "✓ Added" : "🛒 Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
