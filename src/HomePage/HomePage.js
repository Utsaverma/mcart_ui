import React from 'react';
import './HomePage.css';
import ItemsOnSale from '../ItemsOnSale/ItemsOnSale'; 
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'; 

const HomePage = () => {


  return (
    <div className="HomePage">
      <div className="content">
        <div className="sidebar">
          <ItemsOnSale />
        </div>
        <div className="main-content">
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
