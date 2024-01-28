// ProductPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCrown, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { getProducts } from '../reducers/productsSlice';
import { getCart, addItemToCart, removeItemFromCart } from '../reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../services/productServices';

const ProductPage = ({asin}) => {
  // Logic to fetch and display products
  const { id } = useParams();
  const products = useSelector(getProducts);
  const cart = useSelector(getCart);
  const [currProduct, setCurrProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const currId = asin ? asin : id

  useEffect(() => {
    // when a particuar product is only loaded through route
    
    if(currId && products && products.filter){
      setCurrProduct(products.filter(item => item.asin === currId)[0]);
    }
    else if(currId){

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
  }, [currId, asin]);


  useEffect(()=>{
    const itemAlreadyAvaialble = cart.find(obj => obj['asin'] === currId);
    if (itemAlreadyAvaialble) {
      setQuantity(itemAlreadyAvaialble.quantity);
    }
    else{
      setQuantity(0)
    }
  },[cart])

  const handleAddToCart = () => {
    const itemToAdd = {
      asin: currId,
      title: currProduct.title,
      price: currProduct.price,
      list_price: currProduct.list_price,
      img_url: currProduct.img_url,
      quantity: 1
    }
    dispatch(addItemToCart(itemToAdd))
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
    <div className="products-page">
      { currProduct && <div className="product-details-container">
        <h2 title={currProduct.title}> {currProduct.title?.length > 50 ? currProduct.title?.slice(0,50) + "..." : currProduct.title}</h2>
        {
        currProduct.is_best_seller ? (<span className="best-seller">
            <FontAwesomeIcon icon={faCrown} />
            <span>Best Seller</span>
          </span>):null
        }
        <img src={currProduct.img_url} alt={currProduct.title} />
        <div className="stars">{currProduct.stars?renderStars(): "Not Rated"}</div>
        <p>Available at: &nbsp; <span className='listedPrice'>${currProduct.list_price}</span> &nbsp; ${currProduct.price}</p>
        <p>{currProduct.category_name} - {currProduct.sub_category_name}</p>
        <p>Reviews #: {currProduct.reviews}</p>
        <p>Quantities Bought Last Month: {currProduct.bought_in_last_month}</p>
        <p>
          Look for this product on amazon &nbsp;
          <a href={currProduct.product_url} target='_blank'>click here</a>
        </p>

        {
          !quantity ? <button onClick={handleAddToCart}>Add to Cart</button>
          : 
          <div className="quantitySelection">
          <button onClick={decrementCounter}>-</button>
          <h2 className="quantityDisp">{quantity}</h2>
          <button onClick={incrementCounter}>+</button>
        </div>
        }
      </div>
    }
    </div>
  );
};

export default ProductPage;
