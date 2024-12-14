import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Signup.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const navigate = useNavigate(); // Hook to navigate after successful signup
  const { t, i18 } = useTranslation();
  // State for storing form values and error messages
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form inputs
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!formData.mobile || formData.mobile.length !== 10) {
      errors.mobile = "Please enter a valid 10-digit mobile number.";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show validation errors if any
      return;
    }
  
    setLoading(true); // Start the loading state
    const apiPayload = {
      ...formData,
      mobile: formData.mobile, // Map `mobile` to `mobNo`
    };
    console.log("apiPayload================",apiPayload);
    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(apiPayload),
      });
  
      const data = await response.json();
      setLoading(false);
  
      if (response.ok && data.status) {
        // Reset form data
        setFormData({
          firstName: "",
          lastName: "",
          mobile: "",
          password: "",
        });
  
        // Navigate to sign-in page
        navigate("/signin");
      } else {
        // Display backend error message
        setErrors({
          form: data.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during API call:", error);
      setErrors({ form: "Network error. Please try again." });
    }
  };
  
  function goHome() {
    navigate("/");
  }
  return (
    <div className={style.signup_mainwrapper}>
      <div className={style.signup_wrapper}>
        <form className={style.signup_form} onSubmit={handleSubmit}>
          <span className={style.back} onClick={goHome}>
            <IoHomeOutline />
          </span>
          <h1>{t("SignUp")}</h1>
          {errors.form && <div className={style.error}>{errors.form}</div>}

          <div className={style.form_group}>
            <label htmlFor="firstName" className={style.label}>
              {t("FirstName")}
            </label>
            <input
              type="text"
              placeholder={t("FirstName")}
              name="firstName"
              id="firstName"
              className={style.signup_firstName}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className={style.error}>{errors.firstName}</span>
            )}
          </div>

          <div className={style.form_group}>
            <label htmlFor="lastName" className={style.label}>
              {t("LastName")}
            </label>
            <input
              type="text"
              placeholder={t("LastName")}
              name="lastName"
              id="lastName"
              className={style.signup_lastName}
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className={style.error}>{errors.lastName}</span>
            )}
          </div>

          <div className={style.form_group}>
            <label htmlFor="mobile" className={style.label}>
              {t("MobileNo")}
            </label>
            <input
              type="text"
              placeholder={t("MobileNo")}
              name="mobile"
              id="mobile"
              className={style.signup_mob}
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <span className={style.error}>{errors.mobile}</span>
            )}
          </div>

          <div className={style.form_group}>
            <label htmlFor="password" className={style.label}>
              {t("Password")}
            </label>
            <input
              type="password"
              placeholder={t("Password")}
              name="password"
              id="password"
              className={style.signup_password}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={style.error}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={`${style.signup_btn} ${loading ? style.disabled : ""}`}
            disabled={loading}
          >
            {loading ? t("SigningUp") : t("Submit")}
          </button>

          <p className={style.already_ac}>
            {t("HaveAnAc")}
            <span>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive
                    ? `${style.navlink} ${style.active}`
                    : `${style.navlink}`
                }
              >
                {t("Login")}
              </NavLink>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
