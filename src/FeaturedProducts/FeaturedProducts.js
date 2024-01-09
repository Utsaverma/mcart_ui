import React from 'react';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  // Featured products logic here (e.g., array of featured products)
  const featuredProducts = [
    { id: 1, name: 'Featured Product 1', price: 50 },
    { id: 2, name: 'Featured Product 2', price: 75 },
    // Add more featured products
  ];

  return (
    <div className="featured-products">
      <h2>Featured Products</h2>
      <ul>
        {featuredProducts.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeaturedProducts;
