import React from 'react';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  // Featured products logic here (e.g., array of featured products with multiple attributes)
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Featured Product 1', 
      price: 50, 
      description: 'Awesome featured product!', 
      image: 'featured1.jpg' 
    },
    { 
      id: 2, 
      name: 'Featured Product 2', 
      price: 75, 
      description: 'Check out this amazing product!', 
      image: 'featured2.jpg' 
    },
    { 
      id: 3, 
      name: 'Featured Product 3', 
      price: 60, 
      description: 'Check out this amazing product!', 
      image: 'featured3.jpg' 
    },
    ,
    { 
      id: 4, 
      name: 'Featured Product 4', 
      price: 75, 
      description: 'Check out this amazing product!', 
      image: 'featured4.jpg' 
    },
    { 
      id: 5, 
      name: 'Featured Product 5', 
      price: 60, 
      description: 'Check out this amazing product!', 
      image: 'featured5.jpg' 
    },
    // Add more featured products with additional attributes
  ];

  return (
    <div className="featured-products-container">
      <div className="section-heading">Featured Products</div>
      <div className="featured-products">
        <div className="featured-items">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-item">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>{product.description}</p>
                {/* Add more product attributes */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
