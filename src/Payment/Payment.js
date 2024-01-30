import { getCart } from "../reducers/cartSlice";
import { updatePaymentDetails } from "../reducers/paymentDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { CardPayment } from "../PaymentMethods/CardPayment";
import { DirectBankTransfer } from "../PaymentMethods/DirectBankTransfer";
import { ChequePayment } from "../PaymentMethods/ChequePayment";
import { CartAddressSummary } from "../CartAddressSummary/CartAddressSummary";
import { Link } from "react-router-dom";
import "./Payment.css";

export const Payment = () =>{
    
    const dispatch = useDispatch();

    const cartItems = useSelector(getCart);
    const [paymentMethod, setPaymentMethod] = useState('');
   
    const AVAILABLE_PAYMENT_OPTIONS = {
        'paypal': 'Paypal',
        'paytm': 'PayTm',
        'razorpay': 'RazorPay',
        'juspay': 'JusPay',
        'directbanktransfer': 'Direct Bank Transfer',
        'card': 'Pay using card (Debit/Credit)',
        'cheque': 'Cheque Payment',
        'cod': 'Cash On Delivery'
    }

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = (paymentDet) => {
        // console.log(paymentMethod);
        // console.log(paymentDet);
        const paymentDetails = {
            'method': paymentMethod,
            'details': paymentDet,
            'amount': calculateTotalAmount().toFixed(2)
        }
        dispatch(updatePaymentDetails(paymentDetails))
        if(paymentMethod){
            // api call for payment handling
        }
        else{
            // Cash on delivery
        }
    };

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    
    };
    return (
    <div className="minHeight">
        <CartAddressSummary cartItems={cartItems}/>
        <br/>
        <div>
            <h2>Please complete payment of ${calculateTotalAmount().toFixed(2)} using any of the below options:</h2>
            <br/>
            <Row className="paymentContainer">
                <Col>
                {
                    Object.entries(AVAILABLE_PAYMENT_OPTIONS).map(([key, value]) => (
                    <div className="paymentContainer" key={key}>
                        <input
                            className="paymentMethodInputs"
                            type="radio"
                            name="paymentMethod"
                            id={`payment_through_${key}`}
                            value={key}
                            checked={paymentMethod === key}
                            onChange={() => handlePaymentMethodChange(key)}
                        />
                        <label className="paymentMethodLabels" htmlFor={`payment_through_${key}`}>{value}</label>
                    </div>
                    ))
                }
                </Col>
                <Col>
                    {paymentMethod==="card" && <CardPayment handleSubmit={handleSubmit}/>}
                    {paymentMethod==="directbanktransfer" && <DirectBankTransfer handleSubmit={handleSubmit}/>}
                    {paymentMethod==="cheque" && <ChequePayment handleSubmit={handleSubmit}/>}
                    {paymentMethod==="cod" && (
                        <div className="codContainer">
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={()=>handleSubmit('')}>Place Order</Button></Link>
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                    )}
                    {["paypal", "paytm", "juspay", "razorpay"].includes(paymentMethod) && (
                        <Row>
                            <Col>
                                routing to {AVAILABLE_PAYMENT_OPTIONS[paymentMethod]}.com, please provide requested details
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </div>
    </div> 
    )
}

