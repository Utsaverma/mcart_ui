// ProductPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCrown, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { getProducts } from '../reducers/productsSlice';
import { useSelector } from 'react-redux';

const ProductPage = () => {
  // Logic to fetch and display products
  const { id } = useParams();
  const products = useSelector(getProducts);
  const [currProduct, setCurrProduct] = useState({});

  useEffect(() => {
    if(id && products && products.filter){
      setCurrProduct(products.filter(item => item.asin === id)[0]);
    }
    else{
      fetch(`http://localhost:5000/searchById?id=${id}`)
      .then((response)=>response.json())
      .then((data)=>{
        setCurrProduct(data);
      })
      .catch((error)=>{
        // setError(error);
      })
    }
  }, [id]);

  const handleAddToCart = () => {
    console.log('product added to cart');
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
        <h2>{currProduct.title}</h2>
        {
        currProduct.is_best_seller ? (<span className="best-seller">
            <FontAwesomeIcon icon={faCrown} />
            <span>Best Seller</span>
          </span>):null
        }
        <p>here: {console.log(currProduct.is_best_seller)}</p>
        <img src={currProduct.img_url} alt={currProduct.title} />
        <div className="stars">{renderStars()}</div>
        <p>Available at: &nbsp; <span className='listedPrice'>${currProduct.list_price}</span> &nbsp; ${currProduct.price}</p>
        <p>{currProduct.category_name} - {currProduct.sub_category_name}</p>
        <p>Reviews #: {currProduct.reviews}</p>
        <p>Quantities Bought Last Month: {currProduct.bought_in_last_month}</p>
        <p>
          Look for this product on amazon &nbsp;
          <a href={currProduct.product_url} target='_blank'>click here</a>
        </p>

        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    }
    </div>
  );
};

export default ProductPage;
