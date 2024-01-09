import React from 'react';
import './Header.css';

const Header = () => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search functionality here
    // You can use state or other methods to manage search
  };

  return (
    <header className="header">
      <h1>Welcome to MCART</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search for products..." />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
