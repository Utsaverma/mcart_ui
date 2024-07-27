import React, { useEffect, useState } from 'react';

import { getItemsonSale } from '../../services/productServices';
import ProductPage from '../ProductPage/ProductPage';
import { useDispatch } from 'react-redux';
import { updateSaleProducts } from '../../reducers/productsSlice';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CAROUSEL_RESPONSIVE } from '../../helper/utility';
import './ItemsOnSale.css';


const ItemsOnSale = ({ currentTheme }) => {

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsOnSale();
  }, []);

  const getProductsOnSale = async () => {
    const data = await getItemsonSale();
    if (data) {
      setProducts(data);
      dispatch(updateSaleProducts(data));
    }

  }


  return (
    <div className={`items-on-sale-container ${currentTheme}`}>
      <div className="section-heading">Items on Sale</div>
      <div className="items-on-sale">
        <div className="sale-items">
          <Carousel  responsive={CAROUSEL_RESPONSIVE}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style">
          {
            products.map((item) => (
            <div><ProductPage className="sale-item" key={item['asin']} asin={item['asin']} view="saleItems" /></div>
          ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default ItemsOnSale;
