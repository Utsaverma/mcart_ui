import { ADDRESS_KEY_MAPPING, PAYMENTS_KEY_MAPPING, INPUT_TYPE_MAPPING } from "../../helper/utility";
import { Row, Col } from "react-bootstrap";

export const AddressUserInputs = ({ field, required, handleChange, useExistingAddress, existingAddresses, address, error }) => {

    return (
        <>
            {
                required ? <>
                    <label className="newAdressLabel" htmlFor={field}>{ADDRESS_KEY_MAPPING[field]?.value}<span className='requiredFeild'>*</span></label>
                    <input className="newAddressInput" type="text" id={field} name={field} value={useExistingAddress ? existingAddresses[useExistingAddress][field] : address[field]} onChange={handleChange} required />
                    {error[field] && <div className="errorMessage">{error[field]}</div>}
                </>
                    : <>
                        <label className="newAdressLabel" htmlFor={field}>{ADDRESS_KEY_MAPPING[field]?.value}</label>
                        <input className="newAddressInput" type="text" id={field} name={field} value={useExistingAddress ? existingAddresses[useExistingAddress][field] : address[field]} onChange={handleChange} />
                    </>
            }
        </>
    )

}

export const PaymentsUserInputs = ({ field, details, handleChange, error }) => {
    return (
        <>
            <Row className="paymentSubDetails">
                <Col md={1}></Col>
                <Col md={4}>
                    <label htmlFor={field}>{PAYMENTS_KEY_MAPPING[field]}<span className='requiredFeild'>*</span></label>
                </Col>
                <Col md={6}>
                    <input type={INPUT_TYPE_MAPPING[field] ? INPUT_TYPE_MAPPING[field] : "text"} name={field} value={details.field} onChange={handleChange} required />
                    {error[field] && <div className="errorMessage">{error[field]}</div>}
                </Col>
            </Row>
        </>
    )
}