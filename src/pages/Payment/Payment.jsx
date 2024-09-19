import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Toast, Button, Row, Col } from "react-bootstrap";

const Payment = () => {
  const { state } = useLocation();
  const { clearCart, cartItems } = useContext(StoreContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    if (state && state.totalAmount) {
      setTotalAmount(state.totalAmount + 2); // Add delivery fee if applicable
    }
  }, [state]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
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

    // Expiry validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    }

    // CVV validation
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    // Mobile validation
    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number should be exactly 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      displayRazorpay();
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_t39ikL4S4xXpRt",
      currency: "INR",
      amount: totalAmount * 100,
      name: formData.name,
      description: "Test Transaction",
      handler: function (response) {
        setPaymentId(response.razorpay_payment_id); // Store payment ID
        setShowToast(true); // Show success toast
        clearCart();
        setTotalAmount(0);
      },
      prefill: {
        name: formData.name,
        email: "alukabhanuprakash@gmail.com",
        contact: formData.mobileNumber,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "cardNumber") {
      const formattedValue = value
        .replace(/\s+/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({ ...formData, [id]: formattedValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const closeToast = () => {
    setShowToast(false);
    // Reseting form data after the toast is closed
    setFormData({
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      address: "",
      mobileNumber: "",
    });
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
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
              placeholder="1234 5678 1234 5678"
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>

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

          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              id="mobileNumber"
              placeholder="Enter your number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            {errors.mobileNumber && (
              <p className="error">{errors.mobileNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </div>

          <button type="submit" className="pay-button">
            {cartItems && Object.keys(cartItems).length === 0
              ? "Buy Items to Pay"
              : `Pay ₹ ${totalAmount}`}
          </button>

          {/*   <button type="submit" className="pay-button">
            Pay &#8377; {totalAmount}
          </button> */}
        </form>
      </div>

      {showToast && (
        <div className="toast-container">
          <Toast className="toast-custom" show={showToast} onClose={closeToast}>
            <Toast.Header>
              <strong className="me-auto">Payment Successful</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body>
              <h5> Your payment was processed successfully.</h5>
              <h6>
                Payment ID:
                <span style={{ color: "whitesmoke" }}>{paymentId}</span>
              </h6>
            </Toast.Body>
          </Toast>
        </div>
      )}
    </div>
  );
};

export default Payment;
