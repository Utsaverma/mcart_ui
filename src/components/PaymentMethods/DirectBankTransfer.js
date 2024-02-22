import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PAYMENTS_KEY_MAPPING, checkAllEmptyValues, checkEmptyValues } from "../../helper/utility";
import { BankPaymentsUserInputs } from "../UserInputs/UserInputs";
import "../Payment/Payment.css";

export const DirectBankTransfer = ({ handleSubmit }) => {
    const EMPTY_ACCOUNT_DETAILS = {
        accountNumber: '',
        confirmAccountNumber: '',
        accountHolderName: '',
        ifsc: '',
    }

    const [accountDetails, setAccountDetails] = useState(EMPTY_ACCOUNT_DETAILS);
    const [error, setError] = useState(EMPTY_ACCOUNT_DETAILS);
    const [enableSubmit, setEnableSubmit] = useState(false);

    useEffect(() => {
        if (checkAllEmptyValues(error) && !checkEmptyValues(accountDetails)) {
            setEnableSubmit(true);
        }
        else {
            setEnableSubmit(false)
        }
    }, [error])

    const handleAccountDetailsChange = (e) => {
        const { name, value } = e.target;
        if (value?.trim() === '') {
            setError({ ...error, [name]: `${PAYMENTS_KEY_MAPPING[name] + ' is a required field'}` })
        }
        else {
            setError({ ...error, [name]: '' });
        }
        setAccountDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="directbanktransferContainer">
            <h3>Enter Account Details:</h3>
            {
                Object.keys(EMPTY_ACCOUNT_DETAILS).map((field, key) => (
                    <BankPaymentsUserInputs
                        key={key}
                        field={field}
                        accountDetails={accountDetails}
                        handleAccountDetailsChange={handleAccountDetailsChange}
                        error={error}
                    />
                ))
            }
            <Row>
                <Col></Col>
                <Col>
                    {enableSubmit ? <Link to="/orderConfirm"><Button className="submitPaymentBtn" onClick={() => handleSubmit(accountDetails)}>Place Order</Button></Link> :
                        <Button className="submitPaymentBtn" disabled>Place Order</Button>
                    }
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}