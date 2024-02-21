import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Form, Toast, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateCurrentAddress, updateAllAddress, getAllAddress } from '../../reducers/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ADDRESS_KEY_MAPPING } from '../../helper/utility';
import { AddressUserInputs } from '../UserInputs/UserInputs';

const Checkout = () => {
  const dispatch = useDispatch();
  const existingAddresses = useSelector(getAllAddress);

  const EMPTY_ADDRESS = {
    fullName: '',
    address: '',
    landmark: '',
    city: '',
    zipCode: '',
    phoneNo: '',
    additionalInstructions: '',
  }
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [error, setError] = useState(EMPTY_ADDRESS);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(1);

  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(() => {
    dispatch(updateCurrentAddress(existingAddresses[useExistingAddress - 1]))
  }, [useExistingAddress])

  useEffect(() => {
    if (Object.keys(error).some(key => error[key] !== '' && key !== 'landmark' && key !== 'additionalInstructions')) {
      setEnableSubmit(false);
    }
    else {
      setEnableSubmit(true);
    }
  }, [error])

  useEffect(() => {
    // Fetch existing addresses from the API or any other data source

  }, []);

  const handleRadioChange = (index) => {
    setUseExistingAddress(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value?.trim() === '' && name !== 'landmark' && name !== 'additionalInstructions') {
      setError({ ...error, [name]: `${ADDRESS_KEY_MAPPING[name]?.value + ' is a required field'}` })
    }
    else {
      setError({ ...error, [name]: '' });
    }
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', useExistingAddress ? existingAddresses[useExistingAddress] : address);
    const newAddress = { ...address };
    newAddress.addressId = existingAddresses.length + 1;
    dispatch(updateAllAddress([...existingAddresses, newAddress]));
    setAddress(EMPTY_ADDRESS);
    setUseExistingAddress(newAddress.addressId);
    setShowToast(true);
  };

  return (
    <div className="checkout-container minHeight">
      <h2>Checkout</h2>
      <div className="address-selection">
        <h3>Choose Address</h3>
        {existingAddresses.map((addr, _) => (
          <div key={addr.addressId}>
            <input
              className="addressRadio"
              type="radio"
              id={`address_${addr.addressId}`}
              name="addressRadio"
              checked={useExistingAddress === addr.addressId}
              onChange={() => handleRadioChange(addr.addressId)}
            />
            <label className="addressLabel" htmlFor={`address_${addr.addressId}`}>
              {addr.fullName}
              <br />
              {addr.address}, {addr.city}, {addr.zipCode}
              <br />
              {addr.phoneNo}
            </label>
          </div>
        ))}
        <div>
          <input
            className="addressRadio"
            type="radio"
            id="addNewAddress"
            name="addressRadio"
            checked={!useExistingAddress}
            onChange={() => setUseExistingAddress(false)}
          />
          <label className="addressLabel" htmlFor="addNewAddress">Add a new address</label>
        </div>
        <div className="proceedPaymentBtn">
          {
            useExistingAddress ?
              <Button className="btn-active"><Link to="/paymentPage" className='notlink'>Initiate Payment</Link></Button> :
              <Button className="btn-disabled" disabled>Initiate Payment</Button>
          }
        </div>
      </div>
      <div className='newAddressForm'>

        {
          !useExistingAddress && <Form onSubmit={handleSubmit}>

            <div className="address-section">
              {
                Object.keys(ADDRESS_KEY_MAPPING).map((field, key) => (
                  < AddressUserInputs
                    key={key}
                    field={field}
                    required={ADDRESS_KEY_MAPPING[field]?.required}
                    handleChange={handleChange}
                    useExistingAddress={useExistingAddress}
                    existingAddresses={existingAddresses}
                    address={address}
                    error={error}
                  />
                ))
              }
            </div>
            {
              enableSubmit ? <Button className="btn-active" type="submit">Confirm</Button>
                :
                <Button className="btn-disabled" type="submit" disabled>Confirm</Button>
            }
          </Form>
        }
      </div>
      <Row className="toastContainer">
        <Col md={6} className="mb-2 toastSubContainer" position='top-end' >
          <Toast className="addressToast" show={showToast} onClose={toggleShowToast} delay={3000} autohide>
            <Toast.Header>Address added successfully!!
            </Toast.Header>
          </Toast>
        </Col>
      </Row>

    </div>
  );
};

export default Checkout;
