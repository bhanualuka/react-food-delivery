import React, { useState } from "react";
import "./Payment.css";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);

    setFormData({
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      address: "",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Payment Information</h2>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name on Card</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Enter your card number"
              required
            />
          </div>
          <div className="form-group-inline">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Billing Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your billing address"
              required
            />
          </div>
          <button type="submit" className="payment-btn">
            Pay Now
          </button>
        </form>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <span className="checkmark">&#10003;</span>
                <h3>Order Successful!</h3>
              </div>
              <p>Your order has been successfully placed.</p>
              <button onClick={closeModal} className="close-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
