import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import UserDetails from '../UserDetails/UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // General header styles
import { Search } from '../Search/Search';
import { useSelector } from 'react-redux';
import { getCart } from '../reducers/cartSlice';

const Header = (props) => { 
  const cart = useSelector(getCart);
  return (
    <header className="header">
      <div className="left-section">
        <Link to="/"> Home </Link>
        &nbsp; &nbsp;
        <Link to="/category">Category </Link>
      </div>
      <div className="center-section">
        <span className="mcartTitle">Welcome to Mcart</span>
        <Search/>
      </div>
      <div className="right-section">
        <Link to="/orders"> Order Details</Link>
        <Link to="/profile"> Profile</Link>
        <Link to="/cart" className="cart-icon-link">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          <span className="cart-count">{cart?.length}</span>
        </Link>
        <UserDetails signOut={props.signOut} user={props.user}/>
      </div>
    </header>
  );
}

export default Header;
