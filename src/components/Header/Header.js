import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import UserDetails from '../UserDetails/UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // General header styles
import { Search } from '../Search/Search';
import { useSelector } from 'react-redux';
import { getCart } from '../../reducers/cartSlice';

const Header = () => {
  const cart = useSelector(getCart);
  return (
    <header className="header">
      <div className="left-section">
        <Link to="/"> <img src="../../../mcart_logo.png" alt="mcart logo" className="mcart_logo" /> </Link>
        &nbsp; &nbsp;
        <Link to="/" className='header_links'> Home </Link>
        &nbsp; &nbsp;
        <Link to="/category" className='header_links'>Category </Link>
      </div>
      <div className="center-section">
        <span className="mcartTitle">Welcome to Mcart</span>
        <Search />
      </div>
      <div className="right-section">
        <Link to="/orders" className='header_links'> Order Details</Link>
        <Link to="/profile" className='header_links'> Profile</Link>
        <Link to="/cart" className="cart-icon-link header_links">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          <span className="cart-count">{cart?.length}</span>
        </Link>
        <UserDetails />
      </div>
    </header>
  );
}

export default Header;
