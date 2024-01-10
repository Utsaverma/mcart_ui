import React from 'react';
import './Categories.css';

const Categories = () => {
  // Categories logic here (e.g., array of categories)
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];

  return (
    <div className="categories">
      {/* <h2>Categories</h2> */}
      <div className="dropdown">
        <button className="dropbtn">Categories</button>
        <div className="dropdown-content">
          {categories.map((category, index) => (
            <a key={index} href="#">{category}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
