import { getCurrentAddress } from "../reducers/addressSlice";
import { getCart } from "../reducers/cartSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./Payment.css";

export const Payment = () =>{

    const cartItems = useSelector(getCart);
    console.log(cartItems)

    const [paymentMethod, setPaymentMethod] = useState(''); 
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });
    const [accountDetails, setAccountDetails] = useState({
        accountNumber: '',
        confirmAccountNumber: '',
        accountHolderName: '',
        ifsc: '',
    });
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        chequeNumber: ''
    });
    const selectedAddress = useSelector(getCurrentAddress);
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
    
    console.log(selectedAddress);
    console.log(Object.entries(AVAILABLE_PAYMENT_OPTIONS))

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleAccountDetailsChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = () => {
        // You may want to validate payment details before submitting
        console.log(paymentMethod);
        console.log(cardDetails);
    };

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    
    };
    return (
    <div>
        <Row className="cart-address-details">
            <Col lg={6}>
            <ul className="items-selected"> <h4>Current Items Selected</h4>
                {
                    cartItems.map((item, index)=>(
                        <li key={index}>
                            <span>
                            <img className="paymentImages" src={item.img_url} alt={item.title} />
                            </span>
                            <span>
                                <span title={item.title}>{item.title?.length > 50 ? item.title?.slice(0,50) + "..." : item.title}</span>
                                <br/>
                                <span>Available at: ${item.price} &nbsp; &nbsp; Qty {item.quantity}</span>
                            </span>
                            
                        </li>
                    ))
                }     
            </ul>
            </Col>
            <Col lg={6}>
                <Row>
                    <Col className="shippinglabel">Shipping Address:</Col>
                    <Col className="selectedAddress-payment">
                        <p>{selectedAddress.fullName}
                            <br/>{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.zipCode}
                            <br/>
                        {selectedAddress.phoneNo}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
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
                    {paymentMethod==="card" && (
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
                                <Col><Button className="submitPaymentBtn" onClick={handleSubmit}>Place Order</Button></Col>
                                <Col></Col>
                            </Row>
                        </div>
                    )}
                    {["paypal", "paytm", "juspay", "razorpay"].includes(paymentMethod) && (
                        <Row>
                            <Col>
                                routing to {AVAILABLE_PAYMENT_OPTIONS[paymentMethod]}.com, further details to be captured there
                            </Col>
                        </Row>
                    )}
                    {paymentMethod==="directbanktransfer" && (
                        <div className="directbanktransferContainer">
                            <h3>Enter Account Details:</h3>
                            <Row className="paymentSubDetails">
                                <Col md={4}>
                                    <label>Account Number</label>
                                </Col>
                                <Col md={8}>
                                    <input type="password" name="accountNumber" value={accountDetails.accountNumber} onChange={handleBankDetailsChange} />
                                </Col>
                            </Row>
                            <Row className="paymentSubDetails">
                                <Col md={4}>
                                    <label> Confirm Account Number</label>
                                </Col>
                                <Col md={8}>
                                    <input type="text" name="confirmAccountNumber" value={accountDetails.confirmAccountNumber} onChange={handleBankDetailsChange} />
                                </Col>
                            </Row>
                            <Row className="paymentSubDetails">
                                <Col md={4}>
                                    <label> IFSC Code</label>
                                </Col>
                                <Col md={4}>
                                    <input type="text" name="ifsc" value={accountDetails.ifsc} onChange={handleBankDetailsChange} />
                                </Col>
                                <Col md={4}></Col>
                            </Row>
                            <Row className="paymentSubDetails">
                                <Col md={4}>
                                    <label>Account Holder's Name</label>
                                </Col>
                                <Col md={8}>
                                    <input type="text" name="accountHolderName" value={accountDetails.accountHolderName} onChange={handleBankDetailsChange} />
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col><Button className="submitPaymentBtn" onClick={handleSubmit}>Place Order</Button></Col>
                                <Col></Col>
                            </Row>         
                        </div>
                    )}
                    {paymentMethod==="cheque" && (
                        <div className="chequeDetailsContainer">
                            <h3>Enter Cheque Details:</h3>
                            <Row className="paymentSubDetails">
                                <Col md={1}></Col>
                                <Col md={4}>
                                    <label>Bank Name</label>
                                </Col>
                                <Col md={4}>
                                    <input type="text" name="bankName" value={bankDetails.bankName} onChange={handleAccountDetailsChange} />
                                </Col>
                                {/* <Col md={3}></Col> */}
                            </Row>
                            <Row className="paymentSubDetails">
                                <Col md={1}></Col>
                                <Col md={4}>
                                    <label> Cheque Number</label>
                                </Col>
                                <Col md={4}>
                                    <input type="text" name="chequeNumber" value={bankDetails.chequeNumber} onChange={handleAccountDetailsChange} />
                                </Col>
                                {/* <Col md={3}></Col> */}
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col><Button className="submitPaymentBtn" onClick={handleSubmit}>Place Order</Button></Col>
                                <Col></Col>
                            </Row>
                        </div>
                    )}
                    {paymentMethod==="cod" && (
                        <div className="codContainer">
                            <Row>
                                <Col></Col>
                                <Col><Button className="submitPaymentBtn" onClick={handleSubmit}>Place Order</Button></Col>
                                <Col></Col>
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    </div> 
    )
}

