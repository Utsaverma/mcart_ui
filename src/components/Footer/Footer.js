import React from 'react';
import './Footer.css'
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../reducers/ThemeSlice';

const Footer = () => {
  const currentTheme = useSelector(getCurrentTheme);
  return (
    <footer className={`footer ${currentTheme}`}>
      <a href="javascript:void(0)">About Us</a>
      <a href="javascript:void(0)">Contact Us</a>
      <a href="javascript:void(0)">Newsletter</a>
      <span>&copy; 2024 MCART All Rights Reserved.</span>
      <a href="javascript:void(0)">Testimonials</a>
      <a href="javascript:void(0)">Press Releases</a>
    </footer>
  );
}

export default Footer;
