import React from 'react';
import './OrderConfirmation.css';
import { CartAddressSummary } from '../CartAddressSummary/CartAddressSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCart, emptyCart } from '../../reducers/cartSlice';
import { getpaymentDetails } from '../../reducers/paymentDetailsSlice';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateOrders } from '../../reducers/ordersSlice';
import { getCurrentAddress } from '../../reducers/addressSlice';
import { getUser } from '../../reducers/userSlice';
import { saveOrder } from '../../services/orderService';

const OrderConfirmation = () => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartItems = useSelector(getCart);
  const paymentDetails = useSelector(getpaymentDetails);
  const addressDetails = useSelector(getCurrentAddress);
  const userDetails = useSelector(getUser);

  useEffect(() => {
    if (localCartItems.length === 0) {
      setLocalCartItems(cartItems);
      const orderDetails = constructDataToPost(cartItems);
      dispatch(updateOrders(orderDetails));
      saveOrder(orderDetails);
    }
  }, []);

  useEffect(() => {
    if (localCartItems.length !== 0) {
      dispatch(emptyCart(''));
    }

  }, [localCartItems]);

  const constructDataToPost = (cartVals) => {
    let item = constructMetaData(cartVals);
    item['Products'] = addProductDetails(cartVals);
    item['ShippingAddress'] = addAddressDetails();
    item['BillingAddress'] = addAddressDetails();
    addPaymentDetails(item);
    return item;
  }

  const constructMetaData = (cartVals) => {
    const [currentDate, deliveryDate] = getOrderDates();
    return {
      "UserID_OrderID": `${userDetails['userId']}_${generateOrderId()}`,
      "OrderDate": currentDate,
      "ShippingMethod": "Standard",
      "DeliveryDate": deliveryDate,
      "Status": "Pending",
      "TotalAmount": calculateTotalAmount(cartVals).toFixed(2).toString()
    }
  }

  const addProductDetails = (cartVals) => {
    let products = []
    cartVals.forEach(currProd => {
      let item = {
        "ProductID": currProd['asin'],
        "ProductName": currProd['title'],
        "ImageUrl": currProd['img_url'],
        "Quantity": currProd['quantity'].toString(),
        "Price": currProd['price'].toString(),
        "Discount": currProd['list_price'] ? (currProd['list_price'] - currProd['price']).toString() : "0",
        "Subtotal": (currProd['price'] * currProd['quantity']).toString()
      }
      products.push(item);
    })
    return products;
  }

  const addAddressDetails = () => {
    return {
      "Name": addressDetails['fullName'],
      "Street": addressDetails['address'],
      "City": addressDetails['city'],
      "PhoneNo": addressDetails['phoneNo'],
      "ZipCode": addressDetails['zipCode'],
      "Landmark": addressDetails['landmark'],
      "AdditionalInstructions": addressDetails['additionalInstructions']
    }
  }

  const addPaymentDetails = (item) => {
    item["PaymentMethod"] = paymentDetails['method']
    item["PaymentStatus"] = "Paid"
    return item
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
    console.log(orderId)
    return orderId;
  }


  return (
    <div className="OrderConfirmation-page minHeight">
      <h2>Your order has been placed</h2>
      <CartAddressSummary cartItems={localCartItems} />
      <h2>Total amount paid ${paymentDetails.amount} via {paymentDetails.method} payment <span className="more-details" onClick={handleShow}>
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
            paymentDetails.method === 'card' && <>
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
            paymentDetails.method === 'directbanktransfer' && <>
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
            paymentDetails.method === 'cheque' && <>
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
            paymentDetails.method === 'cod' && <>
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
