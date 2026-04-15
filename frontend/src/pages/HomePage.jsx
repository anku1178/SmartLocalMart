import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ onSetUsername }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSetUsername(name.trim());
      navigate("/products");
    }
  };

  return (
    <div className="home-page">
      <div className="home-card">
        <span className="store-emoji">🛒</span>
        <h1>Smart Local Mart</h1>
        <p className="tagline">Your daily essentials, delivered fresh 🌿</p>

        <form onSubmit={handleStart}>
          <div className="input-group">
            <label htmlFor="username">What's your name?</label>
            <input
              id="username"
              type="text"
              placeholder="e.g. Rahul, Priya..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={!name.trim()}
          >
            🛍️ Start Shopping
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
