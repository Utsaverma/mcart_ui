import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Payment/Payment.css";

export const ChequePayment = ({handleSubmit}) => {

    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        chequeNumber: ''
    });

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="chequeDetailsContainer">
            <h3>Enter Cheque Details:</h3>
            <Row className="paymentSubDetails">
                <Col md={1}></Col>
                <Col md={4}>
                    <label>Bank Name</label>
                </Col>
                <Col md={4}>
                    <input type="text" name="bankName" value={bankDetails.bankName} onChange={handleBankDetailsChange} />
                </Col>
                {/* <Col md={3}></Col> */}
            </Row>
            <Row className="paymentSubDetails">
                <Col md={1}></Col>
                <Col md={4}>
                    <label> Cheque Number</label>
                </Col>
                <Col md={4}>
                    <input type="text" name="chequeNumber" value={bankDetails.chequeNumber} onChange={handleBankDetailsChange} />
                </Col>
                {/* <Col md={3}></Col> */}
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={()=>handleSubmit(bankDetails)}>Place Order</Button></Link>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}