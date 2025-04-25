import React, { useState } from 'react';
// import './CheckoutPage.css';

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Famms Checkout</h2>
      <div className="checkout-steps ">
        <div className={`step ${step === 1 ? 'active' : ''}`}>1 LOGIN OR SIGNUP</div>
        {step === 1 && (
        <div className="checkout-panel">
          <input
            type="text"
            placeholder="Enter Email/Mobile number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleNext} disabled={!email.includes('@')}>Continue</button>
        </div>
      )}
        <div className={`step ${step === 2 ? 'active' : ''}`}>2 DELIVERY ADDRESS</div>
        
      {step === 2 && (
        <div className="checkout-panel">
          <textarea
            placeholder="Enter Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="nav-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext} disabled={!address}>Continue</button>
          </div>
        </div>
      )}
        <div className={`step ${step === 3 ? 'active' : ''}`}>3 ORDER SUMMARY</div>
        {step === 3 && (
        <div className="checkout-panel">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Products:</strong> (display from Redux/cart here)</p>
          <div className="nav-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Continue</button>
          </div>
        </div>
      )}
        <div className={`step ${step === 4 ? 'active' : ''}`}>4 PAYMENT OPTIONS</div>
      </div>
      {step === 4 && (
        <div className="checkout-panel">
          <h4>Select Payment Option</h4>
          <ul>
            <li><input type="radio" name="payment" /> Credit/Debit Card</li>
            <li><input type="radio" name="payment" /> UPI</li>
            <li><input type="radio" name="payment" /> Cash on Delivery</li>
          </ul>
          <div className="nav-buttons">
            <button onClick={handleBack}>Back</button>
            <button onClick={(step)=>{alert('order placed successfully..')}}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
