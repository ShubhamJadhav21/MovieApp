import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks
import style from "./ValidateOtp.module.css";

export default function ValidateOtp() {
  const location = useLocation(); // Get the mobile number passed from SignIn
  const navigate = useNavigate(); // Hook to navigate to the Home component

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({ otp: "" });
  const [loading, setLoading] = useState(false); // Loading state for OTP verification

  // Validate OTP
  const validateOtp = (value) => {
    if (value.length !== 6 || !/^[0-9]+$/.test(value)) {
      return "OTP must be a 6-digit number.";
    }
    return "";
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only numbers allowed
    setOtp(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      otp: validateOtp(value),
    }));
  };

  
  const handleVerifyOtp = () => {
    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors((prevErrors) => ({ ...prevErrors, otp: otpError }));
      return;
    }

    setLoading(true); // Start loading during OTP verification


    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobNo: location.state.mobNo, // Use the mobile number passed from SignIn
        otp,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Stop loading after API response
        if (data.status) {
          // Navigate to home page if OTP is correct
          navigate("/");
        } else {
          // Show error if OTP is incorrect
          setErrors((prevErrors) => ({
            ...prevErrors,
            otp: "Invalid OTP. Please try again.",
          }));
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading in case of error
        console.error("Error during OTP verification:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: "An error occurred. Please try again.",
        }));
      });
  };

  return (
    <div className={style.otp_validation_container}>
      <div className={style.otp_container}>
        <h1>Enter OTP</h1>

        <div className={style.otp_input}>
          <label htmlFor="otp" className={style.label}>
            Enter OTP sent to {location.state.mobNo}
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            className={style.otp_input_field}
            value={otp}
            onChange={handleOtpChange}
          />
          {errors.otp && <span className={style.error}>{errors.otp}</span>}
        </div>

        <button
          type="button"
          className={style.verify_btn}
          onClick={handleVerifyOtp}
          disabled={Boolean(errors.otp) || loading} // Disable button if error or loading
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
