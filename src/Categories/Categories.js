import React from 'react';
import './Categories.css';

const Categories = () => {
  // Categories logic here (e.g., array of categories)
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
