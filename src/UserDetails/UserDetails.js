import React from 'react';
import './UserDetails.css';
import { useDispatch } from 'react-redux';
import { update } from '../reducers/userSlice';

const UserDetails = (props) => {
  const dispatch = useDispatch();

  const signOut = () =>{
    dispatch(update({}))
    props.signOut();
  }

  return (
    <div className="user-details">
      <p>Welcome, {props.user.name}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default UserDetails;
