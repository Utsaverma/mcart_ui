import React from 'react';
import "./OrderDetails.css";
import { Button, Col, Row, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderDetails = ({ order }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const formatDate = (inputDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
        return formattedDate;
    }

    return (
        <div className="OrderDetails">
            <div className="OrderSummary">
                <Row className="headers">
                    <Col>ORDER PLACED</Col>
                    <Col>TOTAL</Col>
                    <Col>SHIP TO</Col>
                    <Col>ORDER # {order.OrderID}</Col>
                </Row>
                <Row className="metadata">
                    <Col>{formatDate(order.OrderDate)}</Col>
                    <Col>${order.TotalAmount}</Col>
                    <Col>{order.ShippingAddress.Name}</Col>
                    <Col><span className="viewOrderDetails" onClick={handleShow}>View order details</span>

                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col sm={8}>
                        <p className="currentStatus">{order.Status}: to be delivered by {formatDate(order.DeliveryDate)} through {order.ShippingMethod}</p>
                        <div className="ProductDetails">
                            <ul>
                                {order.Products.map(product => (
                                    <Row key={product.ProductID}>
                                        <Col sm={2}>
                                            <img src={product.ImageUrl} alt={product.ProductName} />
                                        </Col>
                                        <Col sm={10}>
                                            <p><Link to={`/product/${product.ProductID}`}>{product.ProductName}</Link></p>
                                            <p>Quantity: {product.Quantity} | Price: ${product.Price} {product.Color ? <span>| Color: {product.Color}</span> : null} {product.Size ? <span>| Size: {product.Size}</span> : null}</p>
                                        </Col>
                                    </Row>
                                ))}
                            </ul>
                        </div>
                    </Col>
                    <Col className='buttons' sm={4}>
                        <Button variant="light">Track package</Button>
                        <Button variant="light">Return items</Button>
                        <Button variant="light">Leave seller feedback</Button>
                        <Button variant="light">Buy again</Button>
                        <Button variant="light">Write product review</Button>
                    </Col>
                </Row>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Payment Method: {order.PaymentMethod}</p>
                    <p>Payment Status: {order.PaymentStatus}</p>
                    <div className="AddressDetails">
                        <p>Shipping Address: {order.ShippingAddress.Name}, {order.ShippingAddress.Street}, {order.ShippingAddress.City}, {order.ShippingAddress.State}, {order.ShippingAddress.ZipCode}</p>
                        <p>Billing Address: {order.BillingAddress.Name}, {order.BillingAddress.Street}, {order.BillingAddress.City}, {order.BillingAddress.State}, {order.BillingAddress.ZipCode}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrderDetails;
