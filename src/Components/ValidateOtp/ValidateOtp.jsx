import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./ValidateOtp.module.css";
import { login } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

export default function ValidateOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({ otp: "" });
  const [loading, setLoading] = useState(false);

  // Validate OTP
  const validateOtp = (value) => {
    if (value.length !== 6 || !/^[0-9]+$/.test(value)) {
      return "OTP must be a 6-digit number.";
    }
    return "";
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    setOtp(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      otp: validateOtp(value),
    }));
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors((prevErrors) => ({ ...prevErrors, otp: otpError }));
      return;
    }

    setLoading(true); // Start loading

    fetch("https://movies-back-app-aeur.vercel.app/api/v1/users/login/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobNo: location.state?.mobNo, // Safely access mobNo
        otp,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to verify OTP");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        console.log("Backend response:", data); // Debugging
        if (data.status) {
          toast.success("Login Successful");
          localStorage.setItem("isAuthenticated", "true");
          dispatch(login());
          navigate("/");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            otp: "Invalid OTP. Please try again.",
          }));
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during OTP verification:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: "An error occurred. Please try again later.",
        }));
      });
  };

  return (
    <div className={style.otp_validation_container}>
      <div className={style.otp_container}>
        <h1>Enter OTP</h1>
        <div className={style.otp_input}>
          <label htmlFor="otp" className={style.label}>
            Enter OTP sent to{" "}
            {location.state?.mobNo
              ? `+91*** *** ${location.state.mobNo.slice(-4)}`
              : "your number"}
          </label>
          <input
            type="number"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            className={style.otp_input_field}
            value={otp}
            onChange={handleOtpChange}
            disabled={loading}
          />
          {errors.otp && <span className={style.error}>{errors.otp}</span>}
        </div>

        <button
          type="button"
          className={style.verify_btn}
          onClick={handleVerifyOtp}
          disabled={Boolean(errors.otp) || loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
