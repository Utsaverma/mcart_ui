import React from 'react';
import { getItemsfeatured } from '../../services/productServices';
import ProductPage from '../ProductPage/ProductPage';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateFeaturedProducts } from '../../reducers/productsSlice';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    getFeaturedProducts();
  }, []);

  const getFeaturedProducts = async () => {
    const data = await getItemsfeatured();
    if(data){
      setProducts(data);
      dispatch(updateFeaturedProducts(data));
    }
    
  }

  return (
    <div className="featured-products-container">
      <div className="section-heading">Featured Products</div>
      <div className="featured-products">
        <div className="featured-items">
        {products.map((item) => (
            <ProductPage className="featured-item" key={item['asin']} asin={item['asin']} view="featuredItems"/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
