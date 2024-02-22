import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardPaymentsUserInputs } from "../UserInputs/UserInputs";
import { PAYMENTS_KEY_MAPPING, checkAllEmptyValues, checkEmptyValues } from "../../helper/utility";
import "../Payment/Payment.css";

export const CardPayment = ({ handleSubmit }) => {

    const EMPTY_CARD_DETAILS = {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    }

    const [cardDetails, setCardDetails] = useState(EMPTY_CARD_DETAILS);
    const [error, setError] = useState(EMPTY_CARD_DETAILS);
    const [enableSubmit, setEnableSubmit] = useState(false);


    useEffect(() => {
        if (checkAllEmptyValues(error) && !checkEmptyValues(cardDetails)) {
            setEnableSubmit(true);
        }
        else {
            setEnableSubmit(false)
        }
    }, [error])


    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        if (value?.trim() === '') {
            setError({ ...error, [name]: `${PAYMENTS_KEY_MAPPING[name] + ' is a required field'}` })
        }
        else {
            setError({ ...error, [name]: '' });
        }
        setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="cardDetailsContainer">
            <h3>Enter Card Details:</h3>
            {
                Object.keys(EMPTY_CARD_DETAILS).map((field, key) => (
                    <CardPaymentsUserInputs
                        key={key}
                        field={field}
                        cardDetails={cardDetails}
                        handleCardDetailsChange={handleCardDetailsChange}
                        error={error}
                    />
                ))
            }
            <Row>
                <Col></Col>
                <Col>
                    {enableSubmit ? <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={() => handleSubmit(cardDetails)}>Place Order</Button></Link> :
                        <Button className="submitPaymentBtn" disabled>Place Order</Button>
                    }
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}