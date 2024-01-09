import React from 'react';
import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import Footer from './Footer/Footer';
import UserDetails from './UserDetails/UserDetails'; 
import FeaturedProducts from './FeaturedProducts/FeaturedProducts'; 
import Categories from './Categories/Categories';
import ItemsOnSale from './ItemsOnSale/ItemsOnSale';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <div className="sidebar">
          <UserDetails />
          <Categories />
          <ItemsOnSale />
        </div>
        <div className="main-content">
          <FeaturedProducts />
          <ProductList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
