import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Toast } from "react-bootstrap";

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
      setTotalAmount(state.totalAmount + 2);
    }
  }, [state]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should contain only letters and spaces.";
    }

    // Card number validation (16 digits, format 1234 5678 1234 5678)
    const cleanedCardNumber = formData.cardNumber.replace(/\s+/g, "");
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required.";
    } else if (cleanedCardNumber.length !== 16) {
      newErrors.cardNumber = "Card number must be exactly 16 digits.";
    }

    // Expiry validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!formData.expiry) {
      newErrors.expiry = "Expiry date is required.";
    } else if (!expiryRegex.test(formData.expiry)) {
      newErrors.expiry = "Expiry must be in MM/YY format.";
    }

    // CVV validation
    const cvvRegex = /^\d{3}$/;
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required.";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    // Mobile validation
    const mobileNumberRegex = /^\d{10}$/;
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!mobileNumberRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number should be exactly 10 digits.";
    }

    // Address validation
    if (!formData.address) {
      newErrors.address = "Address is required.";
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
        setPaymentId(response.razorpay_payment_id);
        setShowToast(true);
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

  // Real-time validation for inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    let newErrors = { ...errors };

    if (id === "cardNumber") {
      const cleanedValue = value.replace(/\s+/g, "").slice(0, 16); // Limit to 16 digits by using slice methos
      const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({ ...formData, [id]: formattedValue });

      // Validate immediately
      if (cleanedValue.length < 16) {
        newErrors.cardNumber = "Card number must be exactly 16 digits.";
      } else {
        delete newErrors.cardNumber;
      }
    } else if (id === "cvv") {
      const cleanedCvv = value.replace(/\D/g, "").slice(0, 3);
      setFormData({ ...formData, [id]: cleanedCvv });

      // Validate immediately
      if (cleanedCvv.length < 3) {
        newErrors.cvv = "CVV must be exactly 3 digits.";
      } else {
        delete newErrors.cvv;
      }
    } else if (id === "mobileNumber") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10); // removing non-numeric values
      if (cleanedValue.length < 10) {
        newErrors.mobileNumber = "Mobile number should be exactly 10 digits.";
      } else {
        delete newErrors.mobileNumber;
      }
      setFormData({ ...formData, [id]: cleanedValue });
    } else if (id === "expiry") {
      const formattedExpiry = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{2})/, "$1/$2")
        .slice(0, 5);
      setFormData({ ...formData, [id]: formattedExpiry });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    setErrors(newErrors);
  };

  const closeToast = () => {
    setShowToast(false);
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
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your number"
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
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <button type="submit" className="pay-button">
            {cartItems && Object.keys(cartItems).length === 0
              ? "Buy Items to Pay"
              : `Pay ₹ ${totalAmount}`}
          </button>
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
