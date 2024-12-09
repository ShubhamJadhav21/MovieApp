import React, { useState} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export default function SignIn() {
  const [useSignInCode, setUseSignInCode] = useState(false); // State to toggle modes
  const [mobNo, setMobNo] = useState(""); // Mobile number state
  const [password, setPassword] = useState(""); // Password state
  const [errors, setErrors] = useState({ mobNo: "", password: "" });
  const [loading, setLoading] = useState(false); // Loading state for sign-in
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Track if button is clicked

  const navigate = useNavigate(); // Use navigate to redirect to OTP validation
  const {t} = useTranslation()
  function goHome() {
    navigate('/'); // This will navigate to the home page
  }
// Handler to toggle between password and OTP modes
  const toggleSignInMethod = () => {
    setUseSignInCode(!useSignInCode);
    setErrors({ mobNo: "", password: "" }); // Clear errors on toggle
  };

  // Validate mobile number
  const validateMobNo = (value) => {
    if (value.length === 0) {
      return "Mobile number is required.";
    }
    if (value.length !== 10 || !/^[0-9]+$/.test(value)) {
      return "Mobile number must be exactly 10 digits.";
    }
    return "";
  };

  // Validate password
  const validatePassword = (value) => {
    if (value.length === 0) {
      return "Password is required.";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  // Handle sending OTP
  const handleSendOtp = () => {
    setIsButtonClicked(true); // Set button clicked state to true
    const mobNoError = validateMobNo(mobNo);
    if (mobNoError) {
      setErrors((prevErrors) => ({ ...prevErrors, mobNo: mobNoError }));
      return;
    }

    // API call to check if the user is registered
    fetch("/api/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobNo }), // Send the mobile number to the backend
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSignedUp) {
          // If user is signed up, send OTP
          return fetch("/api/send-otp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobNo }), // Send the mobile number for OTP
          });
        } else {
          // If user is not signed up, prompt user to sign up
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobNo: "User not registered. Please sign up.",
          }));
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Navigate to OTP validation page after OTP is sent successfully
          navigate("/otp-validation", { state: { mobNo } });
        }
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobNo: "An error occurred. Please try again.",
        }));
      });
  };

  // Handle Sign-In with password
  const handleSignInWithPassword = () => {
    setIsButtonClicked(true); // Set button clicked state to true
    const mobNoError = validateMobNo(mobNo);
    const passwordError = validatePassword(password);

    if (mobNoError || passwordError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobNo: mobNoError,
        password: passwordError,
      }));
      return;
    }

    setLoading(true); // Start loading while checking credentials

    // API call to validate mobile number and password
    fetch("/api/signin-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobNo, password }), // Send the mobile number and password to the backend
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Stop loading after the API call
        if (data.isAuthenticated) {
          // If the user is authenticated, navigate to the home page
          navigate("/");
        } else {
          // If the password is incorrect
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Invalid password. Please try again.",
          }));
        }
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        setLoading(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "An error occurred. Please try again.",
        }));
      });
  };

  // Disable Send OTP button if mobNo is invalid or empty
  const isOtpButtonDisabled = errors.mobNo !== "" || mobNo.length !== 10;

  // Disable Sign In button if either mobNo or password is invalid
  const isSignInButtonDisabled =
    errors.mobNo !== "" ||
    errors.password !== "" ||
    mobNo.length !== 10 ||
    password.length < 6;

  return (
    <div className={style.signin_maincontainer}>
      <div className={style.main_wrapper_signin}>
        <span className={style.back} >
          <IoHomeOutline onClick={goHome}/>
        </span>
        <div className={style.wrapper_sign_in}>
          <h1>{t('SignIn')}</h1>

          <div className={style.mob}>
            <label htmlFor="mobNo" className={style.label}>
              {t('MobileNo')}
            </label>
            <input
              type="text"
              id="mobNo"
              name="MobNo"
              placeholder={t('MobileNo')}
              className={style.mob_input}
              value={mobNo} // Added value attribute
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 10); // Only numbers, max 10 digits
                setMobNo(value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  mobNo: "", // Clear error as user types
                }));
              }}
            />
            {isButtonClicked && errors.mobNo && (
              <span className={style.error}>{errors.mobNo}</span>
            )}
          </div>

          {useSignInCode ? (
            <button
              type="button"
              className={`${style.otp_btn} ${
                isOtpButtonDisabled ? style.disabled : ""
              }`}
              onClick={handleSendOtp}
              disabled={isOtpButtonDisabled}
            >
              {t('SendOtp')}
            </button>
          ) : (
            <div className={style.pass}>
              <label htmlFor="password" className={style.label}>
                {t('Password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t('Password')}
                className={style.pass_input}
                value={password} // Added value attribute
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "", // Clear error as user types
                  }));
                }}
              />
              {isButtonClicked && errors.password && (
                <span className={style.error}>{errors.password}</span>
              )}

              <button
                type="button"
                className={`${style.signin_btn} ${
                  isSignInButtonDisabled ? style.disabled : ""
                }`}
                onClick={handleSignInWithPassword}
                disabled={isSignInButtonDisabled || loading}
              >
                {loading ? t('SigningIn') : t('SignIn')}
              </button>
            </div>
          )}

          <span className={style.or}>{t('Or')}</span>

          <button className={style.otp} onClick={toggleSignInMethod}>
            {useSignInCode ? t('Password') : t('signincode')}
          </button>

          <div className={style.signup}>
            <p>
             {t('new')}
              <span>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? `${style.navlink} ${style.active}`
                      : `${style.navlink}`
                  }
                >
                  {t('signupNow')}
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
