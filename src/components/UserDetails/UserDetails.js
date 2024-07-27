import React from 'react';
import './UserDetails.css';
import { Link } from 'react-router-dom';
import { AuthData } from '../../App';

const UserDetails = () => {
  const { currUser, handleSignOut } = AuthData();

  return (
    <div className="user-details">
      <p>Welcome, {currUser.name}</p>
      {currUser.isAuthenticated ? <button onClick={handleSignOut}>Sign out</button> : <button><Link to="/login" className='notlink'>Sign in</Link></button>}
    </div>
  );
}

export default UserDetails;
