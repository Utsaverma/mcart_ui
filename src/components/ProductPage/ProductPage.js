// ProductPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCrown, faStarHalfAlt, faTags, faArrowDown, faArrowUp, faHeart, faBars, faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { getProducts, getFeaturedProducts, getSaleProducts } from '../../reducers/productsSlice';
import { getCart, addItemToCart, removeItemFromCart } from '../../reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../services/productServices';
import { Toast, Carousel } from 'react-bootstrap';
import { SideBySideMagnifier, MagnifierContainer, MagnifierPreview, MagnifierZoom } from "react-image-magnifiers";
import classes from "classnames";
import amazon_logo from "../../assets/images/amazon.png"
import './ProductPage.css'; // Import the CSS file

const ProductPage = ({ asin, view }) => {
  // Logic to fetch and display products
  const { id } = useParams();
  const searchedproducts = useSelector(getProducts);
  const saleProducts = useSelector(getSaleProducts);
  const featuredProducts = useSelector(getFeaturedProducts);
  const cart = useSelector(getCart);
  const [currProduct, setCurrProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [maxTitleLength, setMaxTitleLength] = useState(50);
  const [showToast, setShowToast] = useState(false);
  const [showToastWishlist, setShowToastWishlist] = useState(false);
  const [addedToWishList, setAddedToWishList] = useState(false);
  const dispatch = useDispatch();

  const currId = asin ? asin : id;

  // useEffect(()=>{

  // }, [view])

  useEffect(() => {

    // when a particuar product is only loaded through route
    if (currId && saleProducts && saleProducts.length && view === "saleItems") {
      setCurrProduct(saleProducts.filter(item => item.asin === currId)[0]);
      setMaxTitleLength(30);
    }
    else if (currId && featuredProducts && featuredProducts.length && view === "featuredItems") {
      setCurrProduct(featuredProducts.filter(item => item.asin === currId)[0]);
      setMaxTitleLength(30);
    }
    else if (currId && searchedproducts && searchedproducts.length) {
      setCurrProduct(searchedproducts.filter(item => item.asin === currId)[0]);
    }
    else if (currId) {
      const fetchData = async () => {
        try {
          const data = await getProductById(currId);
          setCurrProduct(data);
        } catch (error) {
          // Handle the error (e.g., show an error message to the user)
        }
      };

      fetchData();
    }
  }, [currId, asin, view]);


  useEffect(() => {
    const itemAlreadyAvaialble = cart.find(obj => obj['asin'] === currId);
    if (itemAlreadyAvaialble) {
      setQuantity(itemAlreadyAvaialble.quantity);
    }
    else {
      setQuantity(0)
    }
  }, [cart]);

  const handleAddtoWishlist = () =>{
    const itemToAdd = {
      asin: currId,
      title: currProduct.title,
      price: currProduct.price,
      list_price: currProduct.list_price,
      img_url: currProduct.img_url,
      quantity: 1
    };
    // dispatch for wishlist
    setShowToastWishlist(true);
    setAddedToWishList(!addedToWishList);
  }

  const handleAddToCart = () => {
    const itemToAdd = {
      asin: currId,
      title: currProduct.title,
      price: currProduct.price,
      list_price: currProduct.list_price,
      img_url: currProduct.img_url,
      quantity: 1
    }
    dispatch(addItemToCart(itemToAdd));
    setShowToast(true);
  };

  const incrementCounter = () => {
    const itemToAdd = {
      asin: currId,
      title: currProduct.title,
      price: currProduct.price,
      list_price: currProduct.list_price,
      img_url: currProduct.img_url,
      quantity: 1
    }
    dispatch(addItemToCart(itemToAdd));
  };

  const decrementCounter = () => {
    const itemToAdd = {
      asin: currId,
      quantity: 1
    }
    dispatch(removeItemFromCart(itemToAdd));
  };

  const renderStars = () => {
    if (!currProduct || !currProduct.stars) {
      return null;
    }
    const fullStars = Math.floor(currProduct.stars);
    const decimalStar = currProduct.stars - fullStars;

    const starsArray = [...Array(fullStars)].map((_, index) => (
      <FontAwesomeIcon icon={faStar} key={index} />
    ));

    if (decimalStar > 0) {
      starsArray.push(
        <FontAwesomeIcon icon={faStarHalfAlt} half key={`half-star`} />
      );
    }

    return starsArray;
  };

  return (
    <>
      <div className={`${id ? "routedComponent" : ""} products-page`}>
        {currProduct && <div className="product-details-container">
          <h2 title={currProduct.title} className='largeText'> {currProduct.title?.length > maxTitleLength ? currProduct.title?.slice(0, maxTitleLength) + "..." : currProduct.title}</h2>
          {
            currProduct.is_best_seller ? (<span className="best-seller">
              <FontAwesomeIcon icon={faCrown} />
              <span>Best Seller</span>
            </span>) : null
          }
          {
            view === "saleItems" && <span className="onsale-badge">On Sale</span>
          }
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img className="product_images" src={currProduct.img_url} alt={currProduct.title} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="product_images" src={currProduct.img_url} alt={currProduct.title} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="product_images" src={currProduct.img_url} alt={currProduct.title} />
            </Carousel.Item>
          </Carousel>
          

          {/* <SideBySideMagnifier
            className={classes("magnifier", true)}
            imageSrc={currProduct.img_url}
            touchActivation="tap"
            alwaysInPlace={true}
            transitionSpeed={0.7}
          /> */}
          {/* <MagnifierContainer>
            <div className="example-class">
              <MagnifierPreview imageSrc={currProduct.img_url} />
            </div>
            <MagnifierZoom imageSrc={currProduct.img_url} />
          </MagnifierContainer> */}
          <div className="stars">{currProduct.stars ? renderStars() : "Not Rated"}</div>
          <p >Available at: &nbsp; <span className='crossedText'>${currProduct.list_price}</span> &nbsp; <span className='largeText'>${currProduct.price}</span></p>
          <p><FontAwesomeIcon icon={faTags}/>&nbsp;{currProduct.category_name} - {currProduct.sub_category_name} | Reviews #: {currProduct.reviews}</p>
          <p>Quantities Bought Last Month: {currProduct.bought_in_last_month} {currProduct.bought_in_last_month >=50 ? <FontAwesomeIcon icon={faArrowUp} color="green"/>: <FontAwesomeIcon icon={faArrowDown} color='red'/>}</p>
          <p>
            Look for the product on &nbsp;
            <a href={currProduct.product_url} target='_blank' rel="noreferrer"><img src={amazon_logo} className='amazon_logo' alt='amazon logo' ></img></a>
          </p>
          
          {
            addedToWishList ? 
            <FontAwesomeIcon icon={faHeart} color='red' size='2x' onClick={handleAddtoWishlist} className='wishlist_icon' title="remove item from wishlist"/> 
            : <FontAwesomeIcon icon={farHeart} color='red' size='2x' onClick={handleAddtoWishlist} className='wishlist_icon' title="add item to wishlist"/>}
          {
            !quantity ? <button onClick={handleAddToCart}>Add to Cart</button>
              :
              <div className="quantitySelection">
                <button onClick={decrementCounter}>-</button>
                <h2 className="quantityDisp">{quantity}</h2>
                <button onClick={incrementCounter}>+</button>
              </div>
          }
          <span className='comparison_icon' title="compare with other products"><FontAwesomeIcon icon={faLessThan} size='2x' onClick={()=>{}}/><FontAwesomeIcon icon={faGreaterThan} size='2x' onClick={()=>{}} /></span>
        </div>
        }

      </div>
      <Toast className="itemAddedToCart" onClose={() => setShowToast(false)} show={showToast} position='top-center' delay={3000} autohide>
        <Toast.Header>
          {currProduct.title} added to the cart !
        </Toast.Header>
      </Toast>
      <Toast className="itemAddedToWishlist" onClose={() => setShowToastWishlist(false)} show={showToastWishlist} position='top-center' delay={3000} autohide>
        <Toast.Header>
          {currProduct.title} {addedToWishList ? "added to" : "removed from"} the wishlist !
        </Toast.Header>
      </Toast>
    </>
  );
};

export default ProductPage;
