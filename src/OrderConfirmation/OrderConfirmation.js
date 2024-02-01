import React from 'react';
import './OrderConfirmation.css';
import { CartAddressSummary } from '../CartAddressSummary/CartAddressSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCart, emptyCart } from '../reducers/cartSlice';
import { getpaymentDetails } from '../reducers/paymentDetailsSlice';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cartItems = useSelector(getCart);
  const paymentDetails = useSelector(getpaymentDetails);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, []);

  useEffect(()=>{
    dispatch(emptyCart(''));
  }, [localCartItems])

  console.log(paymentDetails);

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
