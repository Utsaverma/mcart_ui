import React from 'react';
import './HomePage.css';
import ItemsOnSale from '../ItemsOnSale/ItemsOnSale';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../reducers/ThemeSlice';

const HomePage = () => {

  const currentTheme = useSelector(getCurrentTheme)


  return (
    <div className="HomePage">
      <div className="content">
        <div className="sidebar">
          <ItemsOnSale currentTheme={currentTheme} />
        </div>
        <div className="main-content">
          <FeaturedProducts currentTheme={currentTheme} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
