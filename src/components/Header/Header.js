import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserDetails from '../UserDetails/UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Search } from '../Search/Search';
import { useSelector } from 'react-redux';
import { getCart } from '../../reducers/cartSlice';
import { ThemeSelection } from '../ThemeSelection/ThemeSelection';
import './Header.css'; // General header styles
import { getCurrentTheme } from '../../reducers/ThemeSlice';
import Profile from '../Profile/Profile';

const Header = () => {
  const cart = useSelector(getCart);
  const currentTheme = useSelector(getCurrentTheme);

  return (
    <header className={`header ${currentTheme}`}>
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
        <Profile/>
        <Link to="/cart" className="cart-icon-link header_links">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          <span className="cart-count">{cart?.length}</span>
        </Link>
        <UserDetails />
        <ThemeSelection />
      </div>
    </header>
  );
}

export default Header;
