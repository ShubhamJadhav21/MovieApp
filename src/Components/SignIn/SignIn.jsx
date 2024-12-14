import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export default function SignIn() {
  const [useSignInCode, setUseSignInCode] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({ mobile: "", password: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("mobile")?.focus();
    return () => {
      setMobile("");
      setPassword("");
      setOtp("");
      setErrors({ mobile: "", password: "", otp: "" });
    };
  }, []);

  const goHome = () => navigate("/");

  const toggleSignInMethod = useCallback(() => {
    setUseSignInCode((prev) => !prev);
    setErrors({ mobile: "", password: "", otp: "" });
  }, []);

  const validateMobile = (value) => {
    if (value.length === 0) {
      return "Mobile number is required.";
    }
    if (value.length !== 10 || !/^[0-9]+$/.test(value)) {
      return "Mobile number must be exactly 10 digits.";
    }
    return "";
  };

  const validateOtp = (value) => {
    if (value.length === 0) {
      return "OTP is required.";
    }
    if (value.length !== 6 || !/^[0-9]+$/.test(value)) {
      return "OTP must be exactly 6 digits.";
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

  const handleSendOtp = useCallback(() => {
    setIsButtonClicked(true);
    const mobileError = validateMobile(mobile);
    if (mobileError) {
      setErrors((prevErrors) => ({ ...prevErrors, mobile: mobileError }));
      return;
    }

    fetch("http://localhost:3000/api/v1/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOtpSent(true);
          setErrors((prevErrors) => ({ ...prevErrors, mobile: "" }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobile: data.message || "Failed to send OTP. Please try again.",
          }));
        }
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: "An error occurred. Please try again.",
        }));
      });
  }, [mobile]);

  const handleOtpSignIn = useCallback(() => {
    setIsButtonClicked(true);
    const mobileError = validateMobile(mobile);
    const otpError = validateOtp(otp);

    if (mobileError || otpError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobile: mobileError,
        otp: otpError,
      }));
      return;
    }

    setLoading(true);

    fetch("http://localhost:3000/api/v1/users/login-with-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, otp }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data && data.success) {
          navigate("/");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            otp: data.message || "Invalid OTP. Please try again.",
          }));
        }
      })
      .catch((error) => {
        console.error("Error during API call:", error);
        setLoading(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          otp: "An error occurred. Please try again.",
        }));
      });
  }, [mobile, otp, navigate]);

  const handleSignInWithPassword = useCallback(() => {
    setIsButtonClicked(true);
    const mobileError = validateMobile(mobile);
    const passwordError = validatePassword(password);

    if (mobileError || passwordError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobile: mobileError,
        password: passwordError,
      }));
      return;
    }

    setLoading(true);

    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data && data.success) {
          navigate("/");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: data.message || "Invalid password. Please try again.",
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
  }, [mobile, password, navigate]);

  const isOtpButtonDisabled = errors.mobile !== "" || mobile.length !== 10;
  const isSignInButtonDisabled =
    errors.mobile !== "" ||
    errors.password !== "" ||
    mobile.length !== 10 ||
    password.length < 6;

  const isOtpSignInDisabled = errors.mobile !== "" || errors.otp !== "" || otp.length !== 6;

  return (
    <div className={style.signin_maincontainer}>
      <div className={style.main_wrapper_signin}>
        <span className={style.back}>
          <IoHomeOutline onClick={goHome} />
        </span>
        <div className={style.wrapper_sign_in}>
          <h1>{t("SignIn")}</h1>

          <div className={style.mob}>
            <label htmlFor="mobile" className={style.label}>
              {t("MobileNo")}
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              aria-label="Mobile number"
              aria-required="true"
              aria-invalid={!!errors.mobile}
              placeholder={t("MobileNo")}
              className={style.mob_input}
              value={mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                setMobile(value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  mobile: "",
                }));
              }}
            />
            {isButtonClicked && errors.mobile && (
              <span className={style.error}>{errors.mobile}</span>
            )}
          </div>

          {/* {otpSent ? (
            <div className={style.otp_section}>
              <label htmlFor="otp" className={style.label}>
                {t("EnterOtp")}
              </label>
              <input
                type="text"
                id="otp" */}
               


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
                aria-label="Password"
                aria-required="true"
                aria-invalid={!!errors.password}
                placeholder={t("Password")}
                className={style.pass_input}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "",
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
