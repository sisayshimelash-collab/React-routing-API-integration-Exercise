import React from "react";
import { Link } from "react-router-dom";

function Four04() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        ← Back to Home
      </Link>
    </div>
  );
}

export default Four04;
