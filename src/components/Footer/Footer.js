import React, { useState } from 'react';
import './Footer.css'
import { useSelector } from 'react-redux';
import { getCurrentTheme } from '../../reducers/ThemeSlice';
import { Row, Col, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { AVAILABLE_LANGUAGES } from '../../helper/utility';

const Footer = () => {
  const currentTheme = useSelector(getCurrentTheme);
  const [language, setLanguage] = useState(AVAILABLE_LANGUAGES[0]);

  const handleLanguageChange = (value) => {
    console.log(value)
    setLanguage(value);
};

  return (
    <footer className={`footer ${currentTheme}`}>
      <Row className='subfooter'>
        <Col></Col>
        <Col>
          <div className="sub-title">Get to Know Us</div>
          <div><a href="/about">About Us</a></div>
          <div><a href="/career">Careers</a></div>
          <div><a href="/press_releases">Press Releases</a></div>
          <div><a href="/blogs">Blogs</a></div>
          <div><a href="/testimonials">Testimonials</a></div>
          <div><a href="/contact">Contact Us</a></div>
          
        </Col>
        <Col>
        <div className="sub-title">Connect With Us</div>
        <div><a href="https://www.facebook.com/mcartdotshop" target='_blank' rel="noreferrer">Facebook</a></div>
        <div><a href="https://twitter.com/mcartdotshop" target='_blank' rel="noreferrer">X (formerly twitter)</a></div>
        <div><a href="https://www.instagram.com/mcart.shop" target='_blank' rel="noreferrer">Instagram</a></div>
        
        </Col>
        <Col>
        <div className="sub-title">Make Money with Us</div>
        <div><a href="https://sellers.mcart.shop" target='_blank' rel="noreferrer">Sell on Mcart</a></div>
        <div><a href="https://sellers.accelerator.mcart.shop" target='_blank' rel="noreferrer">Sell under Mcart Accelerator</a></div>
        <div><a href="https://build.brand.mcart.shop" target='_blank' rel="noreferrer">Protect and Build Your Brand</a></div>
        <div><a href="https://partners.mcart.shop" target='_blank' rel="noreferrer">Become an Affiliate</a></div>
        <div><a href="https://fulfilments.mcart.shop" target='_blank' rel="noreferrer">Fulfilment by Mcart</a></div>
        <div><a href="https://advertisements.mcart.shop" target='_blank' rel="noreferrer">Advertise Your Products</a></div>
        
        </Col>
        <Col>
          <div className="sub-title">Let us Help You</div>
          <div><a href="https://accounts.mcart.shop" target='_blank' rel="noreferrer">Your Account</a></div>
          <div><a href="https://returns.mcart.shop" target='_blank' rel="noreferrer">Return Center</a></div>
          <div><a href="https://app.mcart.shop" target='_blank' rel="noreferrer">Mcart App Download</a></div>
          <div><a href="https://feedbacks.mcart.shop" target='_blank' rel="noreferrer">Feedback </a></div>
          <div><a href="https://support.mcart.shop" target='_blank' rel="noreferrer">Help</a></div>
        </Col>
        <Col></Col>
      </Row>
      <div className="footer-separator"></div>
      <Row className='subfooter'>
        <Col>
          <span><img src="../../../mcart_logo.png" alt="mcart logo" className="mcart_logo" /></span>
          <span className="internationalization">
            <DropdownButton
            as={ButtonGroup}
            id="dropdown-variants-secondary"
            key="down"
            variant="secondary"
            title={language}
            >
              {
                AVAILABLE_LANGUAGES.map((val, index)=>(
                  <Dropdown.Item eventKey={index + 1} key={index} className="languages" onClick={()=>handleLanguageChange(val)}>
                    <input
                      className="languageSelection"
                      type="radio"
                      name="languageSelection"
                      id="selected_langauge"
                      value={val}
                      checked={language === val}
                      onChange={()=>handleLanguageChange(val)}
                  /><label className="langugaeslabel" htmlFor="selected_langauge">{val}</label>
              </Dropdown.Item>
                  ))
              }
            </DropdownButton>
          </span>
        </Col>
      </Row>
      <Row>
        <Col><img src="../../../made_in_india.jpeg" alt="Made In India logo" className="made_in_india_logo" />Proudly Made in India</Col>
      </Row>
      <div className="footer-separator"></div>
      <Row className="legals">
        <Col></Col>
        <Col><div><a href="/#">Conditions of Use & Sale</a></div></Col>
        <Col>&copy; 2024 MCART All Rights Reserved.</Col>
        <Col><div><a href="/#">Privacy Notice</a></div></Col>
        <Col></Col>
        </Row>
        <div className="footer-separator-last"></div>
        <div className="legals">
          <div className='sub-title'>ONLINE SHOPPING MADE EASY AT MCART</div>
          <p>If you would like to experience the best of online shopping for men, women and kids in India, you are at the right place.
             Mcart is the ultimate destination for fashion and lifestyle, being host to a wide array of merchandise including clothing, accessories, jewellery, personal care products and more.
             It is time to redefine your style statement with our treasure-trove of trendy items. 
             Our online store brings you the latest in designer products straight out of fashion houses. 
             You can shop online at Mcart from the comfort of your home and get your favourites delivered right to your doorstep.</p>
        </div>
      
      
    </footer>
  );
}

export default Footer;
