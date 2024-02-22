import React, { useEffect, useState } from 'react';
import './ItemsOnSale.css';
import { getItemsonSale } from '../../services/productServices';
import ProductPage from '../ProductPage/ProductPage';
import { useDispatch } from 'react-redux';
import { updateSaleProducts } from '../../reducers/productsSlice';

const ItemsOnSale = () => {

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
    <div className="items-on-sale-container">
      <div className="section-heading">Items on Sale</div>
      <div className="items-on-sale">
        <div className="sale-items">
          {products.map((item) => (
            <ProductPage className="sale-item" key={item['asin']} asin={item['asin']} view="saleItems" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsOnSale;
