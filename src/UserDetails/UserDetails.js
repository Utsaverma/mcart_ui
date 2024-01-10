import React from 'react';
import './UserDetails.css';

const UserDetails = () => {
  // Your user details logic here (e.g., user name, profile image, etc.)
  const userName = "Utsav Verma";

  return (
    <div className="user-details">
      <p>Welcome, {userName}!</p>
      {/* Add more user-related information */}
    </div>
  );
}

export default UserDetails;
