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

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation (letters and spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    // Card number validation (exactly 16 digits with spaces between every 4 digits)
    const cardNumberRegex = /^(\d{4} \d{4} \d{4} \d{4})$/;
    const cleanedCardNumber = formData.cardNumber.replace(/\s+/g, "");
    if (
      !cardNumberRegex.test(formData.cardNumber) ||
      cleanedCardNumber.length !== 16
    ) {
      newErrors.cardNumber =
        "Card number must be 16 digits, formatted as '1234 5678 1234 5678'.";
    }

    // Expiry validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    }

    // CVV validation (exactly 3 digits)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);

      // Reset form data
      setFormData({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        address: "",
      });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Format card number to include spaces every 4 digits
    if (id === "cardNumber") {
      const formattedValue = value
        .replace(/\s+/g, "") // Remove existing spaces
        .replace(/(\d{4})(?=\d)/g, "$1 "); // Add space after every 4 digits
      setFormData({ ...formData, [id]: formattedValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="paymentFrom"></div>

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
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Format : 1234 5678 1234 5678"
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
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
              {errors.expiry && <p className="error">{errors.expiry}</p>}
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
              {errors.cvv && <p className="error">{errors.cvv}</p>}
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
