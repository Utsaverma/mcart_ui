import React from 'react';
import './UserDetails.css';

const UserDetails = (props) => {
  // Your user details logic here (e.g., user name, profile image, etc.)

  return (
    <div className="user-details">
      <p>Welcome, {props.user.name}</p>
      <button onClick={props.signOut}>Sign out</button>
    </div>
  );
}

export default UserDetails;
