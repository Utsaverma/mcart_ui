import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import UserDetails from '../UserDetails/UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // General header styles
import { Search } from '../Search/Search';

const Header = (props) => { 

  return (
    <header className="header">
      <div className="left-section">
        <Categories />
      </div>
      <div className="center-section">
        <Search/>
      </div>
      <div className="right-section">
        <Link to="/cart" className="cart-icon-link">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        </Link>
        <UserDetails signOut={props.signOut} user={props.user}/>
      </div>
    </header>
  );
}

export default Header;
