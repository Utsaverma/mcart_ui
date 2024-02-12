import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Payment/Payment.css";

export const DirectBankTransfer = ({handleSubmit}) => {

    const [accountDetails, setAccountDetails] = useState({
        accountNumber: '',
        confirmAccountNumber: '',
        accountHolderName: '',
        ifsc: '',
    });

    const handleAccountDetailsChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="directbanktransferContainer">
            <h3>Enter Account Details:</h3>
            <Row className="paymentSubDetails">
                <Col md={4}>
                    <label>Account Number</label>
                </Col>
                <Col md={8}>
                    <input type="password" name="accountNumber" value={accountDetails.accountNumber} onChange={handleAccountDetailsChange} />
                </Col>
            </Row>
            <Row className="paymentSubDetails">
                <Col md={4}>
                    <label> Confirm Account Number</label>
                </Col>
                <Col md={8}>
                    <input type="text" name="confirmAccountNumber" value={accountDetails.confirmAccountNumber} onChange={handleAccountDetailsChange} />
                </Col>
            </Row>
            <Row className="paymentSubDetails">
                <Col md={4}>
                    <label> IFSC Code</label>
                </Col>
                <Col md={4}>
                    <input type="text" name="ifsc" value={accountDetails.ifsc} onChange={handleAccountDetailsChange} />
                </Col>
                <Col md={4}></Col>
            </Row>
            <Row className="paymentSubDetails">
                <Col md={4}>
                    <label>Account Holder's Name</label>
                </Col>
                <Col md={8}>
                    <input type="text" name="accountHolderName" value={accountDetails.accountHolderName} onChange={handleAccountDetailsChange} />
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={()=>handleSubmit(accountDetails)}>Place Order</Button></Link>
                </Col>
                <Col></Col>
            </Row>         
        </div>
    )
}