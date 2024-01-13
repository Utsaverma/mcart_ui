import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import UserDetails from '../UserDetails/UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // General header styles

const Header = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form submission (if within a form)
    // Perform search operation with the searchQuery state value
    console.log('Searching for:', searchQuery);
    // Add your search logic here (e.g., API call, filtering data, etc.)
  };

  return (
    <header className="header">
      <div className="left-section">
        <Categories />
      </div>
      <div className="center-section">
        {/* Search form */}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
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
