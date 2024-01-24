import './Checkout.css';
import { useState } from 'react';

export const Checkout = () =>{
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to process the form data (e.g., send to server, handle payment, etc.)
    console.log('Form data submitted:', formData);
    };

    return (
    <div className="checkout-container">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
        {/* Address Details */}
        <div className="address-section">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />

            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />

            <label htmlFor="zipCode">ZIP Code:</label>
            <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
        </div>

        {/* Payment Details */}
        <div className="payment-section">
            <h3>Payment Information</h3>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />

            <label htmlFor="expiryDate">Expiry Date:</label>
            <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />

            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
        </div>

        {/* Submit Button */}
        <button type="submit">Place Order</button>
        </form>
    </div>
    );
};