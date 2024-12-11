import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export default function SignIn() {
  const [useSignInCode, setUseSignInCode] = useState(false); 
  const [mobNo, setMobNo] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [errors, setErrors] = useState({ mobNo: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  const navigate = useNavigate(); 
  const { t } = useTranslation();

  function goHome() {
    navigate("/"); 
  }

  
  const toggleSignInMethod = () => {
    setUseSignInCode(!useSignInCode);
    setErrors({ mobNo: "", password: "" });
  };

  
  const validateMobNo = (value) => {
    if (value.length === 0) {
      return "Mobile number is required.";
    }
    if (value.length !== 10 || !/^[0-9]+$/.test(value)) {
      return "Mobile number must be exactly 10 digits.";
    }
    return "";
  };


  const validatePassword = (value) => {
    if (value.length === 0) {
      return "Password is required.";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  
  const handleSendOtp = () => {
    setIsButtonClicked(true); 
    const mobNoError = validateMobNo(mobNo);
    if (mobNoError) {
      setErrors((prevErrors) => ({ ...prevErrors, mobNo: mobNoError }));
      return;
    }

    
    fetch("http://localhost:3000/api/v1/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobNo }), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          
          navigate("/otp-validation", { state: { mobNo } });
        } else {
          
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobNo: data.message || "Failed to send OTP. Please try again.",
          }));
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

  
  const handleSignInWithPassword = () => {
    setIsButtonClicked(true); 
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

    setLoading(true); 

    // API call to validate mobile number and password
    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobNo, password }), 
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); 
        if (data) {
          
          navigate("/");
        } else {
          
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
        <span className={style.back}>
          <IoHomeOutline onClick={goHome} />
        </span>
        <div className={style.wrapper_sign_in}>
          <h1>{t("SignIn")}</h1>

          <div className={style.mob}>
            <label htmlFor="mobNo" className={style.label}>
              {t("MobileNo")}
            </label>
            <input
              type="text"
              id="mobNo"
              name="MobNo"
              placeholder={t("MobileNo")}
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
              {t("SendOtp")}
            </button>
          ) : (
            <div className={style.pass}>
              <label htmlFor="password" className={style.label}>
                {t("Password")}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("Password")}
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
                {loading ? t("SigningIn") : t("SignIn")}
              </button>
            </div>
          )}

          <span className={style.or}>{t("Or")}</span>

          <button className={style.otp} onClick={toggleSignInMethod}>
            {useSignInCode ? t("Password") : t("signincode")}
          </button>

          <div className={style.signup}>
            <p>
              {t("new")}
              <span>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? `${style.navlink} ${style.active}`
                      : `${style.navlink}`
                  }
                >
                  {t("signupNow")}
                </NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
