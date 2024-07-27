import React from 'react';
import { getItemsfeatured } from '../../services/productServices';
import ProductPage from '../ProductPage/ProductPage';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateFeaturedProducts } from '../../reducers/productsSlice';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CAROUSEL_RESPONSIVE } from '../../helper/utility';
import './FeaturedProducts.css';

const FeaturedProducts = ({ currentTheme }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  const getFeaturedProducts = async () => {
    const data = await getItemsfeatured();
    if (data) {
      setProducts(data);
      dispatch(updateFeaturedProducts(data));
    }

  }

  return (
    <div className={`featured-products-container ${currentTheme}`}>
      <div className="section-heading">Featured Products</div>
      <div className="featured-products">
        <div className="featured-items">
        <Carousel  responsive={CAROUSEL_RESPONSIVE}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style">
            {products.map((item) => (
              <ProductPage className="featured-item" key={item['asin']} asin={item['asin']} view="featuredItems" />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
