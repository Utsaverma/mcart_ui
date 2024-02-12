import React from 'react';
import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import { getCart, addItemToCart, removeItemFromCart } from '../../reducers/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCart);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const incrementCounter = (asin) => {
    const currProduct = cartItems.find(obj => obj['asin'] === asin)
    const itemToAdd = {
      asin: asin,
      title: currProduct.title,
      price: currProduct.price,
      list_price: currProduct.list_price,
      img_url: currProduct.img_url,
      quantity: 1
    }
    dispatch(addItemToCart(itemToAdd));
  };

  const decrementCounter = (asin) => {
    const itemToAdd = {
      asin: asin,
      quantity: 1
    }
    dispatch(removeItemFromCart(itemToAdd));
  };

  return (
    <div className="Cart-page minHeight">
      { cartItems.length !== 0 && <div className="checkoutButton">
        <Link to="/checkout"><button className="btn btn-primary">Proceed to checkout</button></Link>
        </div>
      }
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <Row>
                <Col md={4} className="cartHeader">Product</Col>
                <Col md={2} className="cartHeader">Listed Price</Col>
                <Col md={2} className="cartHeader">Price</Col>
                <Col md={2} className="cartHeader">Quantity</Col>
                <Col md={2} className="cartHeader">Total</Col>
              </Row>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <Row key={item.asin}>
                  <Col md={4} className="cartBody">
                    <div className='title'>
                      <div className="cartImage"><Link to={`/product/${item.asin}`}><img src={item.img_url} alt={item.title} /></Link></div>
                      <div className="cartTitles">{item.title}</div>
                    </div>
                  </Col>
                  <Col md={2} className="cartBody">${item.list_price ? item.list_price : item.price}</Col>
                  <Col md={2} className="cartBody">${item.price}</Col>
                  <Col md={2} className="cartBody">
                    <button className="btn btn-dec" onClick={() => decrementCounter(item.asin)}>-</button>
                    {item.quantity}
                    <button className="btn btn-inc" onClick={() => incrementCounter(item.asin)}>+</button>
                    </Col>
                  <Col md={2} className="cartBody">${(item.price * item.quantity).toFixed(2)}</Col>
                </Row>
              ))}
            </tbody>
          </Table>
          <p className='totalamt'>Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
