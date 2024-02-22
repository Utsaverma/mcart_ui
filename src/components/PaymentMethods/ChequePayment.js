import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChequePaymentsUserInputs } from "../UserInputs/UserInputs";
import { PAYMENTS_KEY_MAPPING, checkEmptyValues, checkAllEmptyValues } from "../../helper/utility";
import "../Payment/Payment.css";

export const ChequePayment = ({ handleSubmit }) => {

    const EMPTY_BANK_DETAILS = {
        bankName: '',
        chequeNumber: ''
    }

    const [bankDetails, setBankDetails] = useState(EMPTY_BANK_DETAILS);
    const [error, setError] = useState(EMPTY_BANK_DETAILS);
    const [enableSubmit, setEnableSubmit] = useState(false);

    useEffect(() => {
        if (checkAllEmptyValues(error) && !checkEmptyValues(bankDetails)) {
            setEnableSubmit(true);
        }
        else {
            setEnableSubmit(false)
        }
    }, [error])

    const handleBankDetailsChange = (e) => {
        const { name, value } = e.target;
        if (value?.trim() === '') {
            setError({ ...error, [name]: `${PAYMENTS_KEY_MAPPING[name] + ' is a required field'}` })
        }
        else {
            setError({ ...error, [name]: '' });
        }
        setBankDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="chequeDetailsContainer">
            <h3>Enter Cheque Details:</h3>
            {
                Object.keys(EMPTY_BANK_DETAILS).map((field, key) => (
                    <ChequePaymentsUserInputs
                        key={key}
                        field={field}
                        bankDetails={bankDetails}
                        handleBankDetailsChange={handleBankDetailsChange}
                        error={error}
                    />
                ))
            }
            <Row>
                <Col></Col>
                <Col>
                    {enableSubmit ? <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={() => handleSubmit(bankDetails)}>Place Order</Button></Link> :
                        <Button className="submitPaymentBtn" disabled>Place Order</Button>
                    }
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}