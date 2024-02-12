import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Form, Toast, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateCurrentAddress, updateAllAddress, getAllAddress} from '../../reducers/addressSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Checkout = () => {
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
  const [showToast, setShowToast] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(1);

  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(()=>{
    dispatch(updateCurrentAddress(existingAddresses[useExistingAddress - 1]))
  }, [useExistingAddress])

  useEffect(() => {
    // Fetch existing addresses from the API or any other data source
    
  }, []);

  const handleRadioChange = (index) => {
    setUseExistingAddress(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', useExistingAddress ? existingAddresses[useExistingAddress] : address);
    const newAddress =  { ...address };
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
              <br/>
              {addr.address}, {addr.city}, {addr.zipCode}
              <br/>
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
              <label className="newAdressLabel" htmlFor="fullName">Full Name:</label>
              <input className="newAddressInput"type="text" id="fullName" name="fullName" value={useExistingAddress ? existingAddresses[useExistingAddress].fullName : address.fullName} onChange={handleChange} required />
    
              <label className="newAdressLabel" htmlFor="address">Address:</label>
              <input className="newAddressInput"type="text" id="address" name="address" value={useExistingAddress ? existingAddresses[useExistingAddress].address : address.address} onChange={handleChange} required />
    
              <label className="newAdressLabel" htmlFor="city">City:</label>
              <input className="newAddressInput"type="text" id="city" name="city" value={useExistingAddress ? existingAddresses[useExistingAddress].city : address.city} onChange={handleChange} required />
    
              <label className="newAdressLabel" htmlFor="zipCode">ZIP Code:</label>
              <input className="newAddressInput"type="text" id="zipCode" name="zipCode" value={useExistingAddress ? existingAddresses[useExistingAddress].zipCode : address.zipCode} onChange={handleChange} required />
    
              <label className="newAdressLabel" htmlFor="landmark">Landmark</label>
              <input className="newAddressInput"type="text" id="landmark" name="landmark" value={useExistingAddress ? existingAddresses[useExistingAddress].landmark : address.landmark} onChange={handleChange} />
    
              <label className="newAdressLabel" htmlFor="phoneNo">Contact Number</label>
              <input className="newAddressInput"type="text" id="phoneNo" name="phoneNo" value={useExistingAddress ? existingAddresses[useExistingAddress].phoneNo : address.phoneNo} onChange={handleChange} required />
    
              <label className="newAdressLabel" htmlFor="additionalInstructions">Additional Instructions</label>
              <input className="newAddressInput"
                type="text"
                id="additionalInstructions"
                name="additionalInstructions"
                value={useExistingAddress ? existingAddresses[useExistingAddress].additionalInstructions : address.additionalInstructions}
                onChange={handleChange}
              />
            </div>
    
            {/* Submit Button */}
            <button type="submit">Confirm</button>
          </Form>
        }
     </div>
    <Row className="toastContainer">
        <Col md={6} className="mb-2 toastSubContainer" position='top-end' >
        <Toast className="addressToast" show={showToast} onClose={toggleShowToast}  delay={3000} autohide>
            <Toast.Header>Address added successfully!!
            </Toast.Header>
        </Toast>
        </Col>
    </Row>

    </div>
  );
};
