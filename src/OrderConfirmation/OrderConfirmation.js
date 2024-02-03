import React from 'react';
import './OrderConfirmation.css';
import { CartAddressSummary } from '../CartAddressSummary/CartAddressSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCart, emptyCart } from '../reducers/cartSlice';
import { getpaymentDetails } from '../reducers/paymentDetailsSlice';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateOrders } from '../reducers/ordersSlice';

const OrderConfirmation = () => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartItems = useSelector(getCart);
  const paymentDetails = useSelector(getpaymentDetails);

  useEffect(() => {    
    if(localCartItems.length === 0){
      setLocalCartItems(cartItems);
      constructDataToPost(cartItems)
      dispatch(updateOrders({}));
    }
  }, []);

  useEffect(()=>{
    if(localCartItems.length !== 0){
      dispatch(emptyCart(''));
    }
    
  }, [localCartItems]);

//   {
//     // "OrderID": "12345",
//     "UserID": "user123",
//     // "OrderDate": "2024-01-01T12:00:00",
//     // "Products": [
//     //   {
//     //       "ProductID": "B0C4H2CHDV",
//     //       "ProductName": "Boston Cap Unisex Baseball Cap Sun Hat Adjustable Trucker Cap",
//     //       "ImageUrl": "https://m.media-amazon.com/images/I/516WGe4YvVL._AC_UL320_.jpg",
//     //       "Quantity": 2,
//     //       "Price": 29.99,
//     //       "Color": "Red",
//     //       "Size": "Medium",
//     //       "Brand": "Brand A",
//     //       "Category": "Clothing",
//     //       "Subcategory": "T-Shirts",
//     //       "Discount": 5.00,
//     //       "Subtotal": 54.98
//     //   },
//     //   {
//     //       "ProductID": "B003VSARVA",
//     //       "ProductName": "Piper Cap",
//     //       "ImageUrl": "https://m.media-amazon.com/images/I/31XwvOz-bmL._AC_UL320_.jpg",
//     //       "Quantity": 1,
//     //       "Price": 49.99,
//     //       "Color": "Blue",
//     //       "Size": "Large",
//     //       "Brand": "Brand B",
//     //       "Category": "Footwear",
//     //       "Subcategory": "Sneakers",
//     //       "Discount": 0.00,
//     //       "Subtotal": 49.99
//     //   }
//     // ],
//     // "TotalAmount": 104.97,
//     // "Status": "Pending",
//     "ShippingAddress": {
//       "Name": "Utsav Verma",
//       "Street": "123 Main St",
//       "City": "Cityville",
//       "State": "ST",
//       "ZipCode": "12345"
//     },
//     "BillingAddress": {
//       "Name": "Utsav Verma",
//       "Street": "456 Billing St",
//       "City": "Cityville",
//       "State": "ST",
//       "ZipCode": "12345"
//     },
//     "PaymentMethod": "CreditCard",
//     "PaymentStatus": "Paid",
//     // "ShippingMethod": "Standard",
//     // "DeliveryDate": "2024-01-10"
// }
  

  const constructDataToPost = (cartVal) =>{
    item = constructMetaData(cartVals);
    addProductDetails(cartVal);
    addAddressDetails();
    addPaymentDetails();
    
  }

  constructMetaData = (cartVals) => {
    const [currentDate, deliveryDate] = getOrderDates();
    
    item = {
      "OrderID": generateOrderId(),
      "UserID": "",
      "OrderDate": currentDate,
      "ShippingMethod": "Standard",
      "DeliveryDate": deliveryDate,
      "Status": "Pending",
      "TotalAmount":calculateTotalAmount(cartVals).toFixed(2)
    }
  }

  const addProductDetails = (cartVal) => {
    products = []
    cartVal.forEach(currProd =>{
      item = {
        "ProductID": currProd['asin'],
        "ProductName": currProd['title'],
        "ImageUrl": currProd['img_url'],
        "Quantity": currProd['quantity'],
        "Price": currProd['price'],
        "Discount": currProd['list_price'] ? currProd['list_price'] - currProd['price'] : 0,
        "Subtotal": currProd['price'] * currProd['quantity']
      }
      products.push(item);
    })
    return products;
  }

  const addAddressDetails = () => {

  }

  const addPaymentDetails = () => {
    
  }

  const getOrderDates = () => {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 10);
    const currentFormattedDate = currentDate.toISOString().slice(0, 19);
    const deliveryFormattedDate = deliveryDate.toISOString().slice(0, 19);
    return [currentFormattedDate, deliveryFormattedDate];
  }

  const calculateTotalAmount = (cartVals) => {
    return cartVals.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const generateOrderId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const orderId = `${timestamp}${randomNumber}`;
    return orderId;
  }


  return (
    <div className="OrderConfirmation-page minHeight">
      <h2>Your order has been placed</h2>
      <CartAddressSummary cartItems={localCartItems}/>
      <h2>Total amount paid ${paymentDetails.amount} via {paymentDetails.method} payment <span className="more-details"onClick={handleShow}>
        more details
      </span></h2>

      
      <Link to="/">
        <Button>
          Back to Shopping
        </Button>
      </Link>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col> Amount Paid </Col>
            <Col> ${paymentDetails.amount}</Col>
          </Row>
          <Row>
            <Col> Payment made through </Col>
            <Col> {paymentDetails.method}</Col>
          </Row>
          {
            paymentDetails.method==='card' && <>
            <Row>
              <Col> Card ending with </Col>
              <Col>{paymentDetails.details.cardNumber?.slice(-4)}</Col>
            </Row>
            <Row>
              <Col> Card belongs to </Col>
              <Col>{paymentDetails.details.name}</Col>
            </Row>
            </>
          }
          {
            paymentDetails.method==='directbanktransfer' && <>
            <Row>
              <Col> Account Number </Col>
              <Col>{paymentDetails.details.accountNumber?.slice(-4)}</Col>
            </Row>
            <Row>
              <Col> Account Holder Name </Col>
              <Col>{paymentDetails.details.accountHolderName}</Col>
            </Row>
            <Row>
              <Col> IFSC Code </Col>
              <Col>{paymentDetails.details.ifsc}</Col>
            </Row>
            </>
          }
          {
            paymentDetails.method==='cheque' && <>
            <Row>
              <Col> Cheque ending with </Col>
              <Col>{paymentDetails.details.chequeNumber?.slice(-4)}</Col>
            </Row>
            <Row>
              <Col> Bank Name </Col>
              <Col>{paymentDetails.details.bankName}</Col>
            </Row>
            </>
          }
          {
            paymentDetails.method==='cod' && <>
            Cash On Delivery
            </>
          }
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderConfirmation;
