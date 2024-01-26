import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Payment/Payment.css";

export const CardPayment = ({handleSubmit}) => {

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="cardDetailsContainer">
            <h3>Enter Card Details:</h3>
            <Row className="paymentSubDetails">
                <Col md={2}>
                    <label> Card Number:</label>
                </Col>
                <Col md={10}>
                    <input type="text" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardDetailsChange} />
                </Col>
            </Row>
            <Row className="paymentSubDetails">
                <Col md={2}>
                    <label> Expiry Date</label>
                </Col>
                <Col md={4}>
                    <input type="text" name="expiryDate" value={cardDetails.expiryDate} onChange={handleCardDetailsChange} />
                </Col>
                <Col md={2}>
                    <label> CVV</label>
                </Col>
                <Col md={4}>
                    <input type="text" name="cvv" value={cardDetails.cvv} onChange={handleCardDetailsChange} />
                </Col>
            </Row>
            <Row className="paymentSubDetails">
                <Col md={2}>
                    <label> Name on Card</label>
                </Col>
                <Col md={10}>
                    <input type="text" name="name" value={cardDetails.name} onChange={handleCardDetailsChange} />
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={()=>handleSubmit(cardDetails)}>Place Order</Button></Link>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}