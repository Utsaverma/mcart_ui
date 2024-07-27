import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Profile.css';

const Profile = () => {
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary header_links profile_nav">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/> 
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown 
            title="Profile" 
            id="collapsible-nav-dropdown" 
            show={show}
            onMouseEnter={showDropdown} 
            onMouseLeave={hideDropdown}
            >
              <NavDropdown.Item href="/profile/account">Your Account</NavDropdown.Item>
              <NavDropdown.Item href="/orders">Your Orders</NavDropdown.Item>
              <NavDropdown.Item href="/profile/wishlist">Your Wishlist</NavDropdown.Item>
              <NavDropdown.Item href="/profile/recommendations">Your Recommendation</NavDropdown.Item>
              <NavDropdown.Item href="/profile/reviews">Your Reviews</NavDropdown.Item>
              <NavDropdown.Item href="/profile/subscription">Your Subscription</NavDropdown.Item>
              <NavDropdown.Item href="/profile/defaults">Change Defaults</NavDropdown.Item>
              <NavDropdown.Item href="/profile/explore">Explore More</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Profile;
