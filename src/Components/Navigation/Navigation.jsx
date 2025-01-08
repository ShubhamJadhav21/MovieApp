import React from "react";
import { IoLanguageOutline } from "react-icons/io5";
import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Profile from "../Profile/Profile";
import { useSelector } from "react-redux";

export default function Navigation() {
  const { t, i18n } = useTranslation(); // Hook for translations and language control
  const loggedIn = useSelector((state)=>state.users.loggedIn)
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); // Change language dynamically
  };

  return (
    <div className={style.nav_wrapper}>
      <div className={style.logo}>{t("MovieDekho")}</div> 
      <div className={style.nav_right}>
        <div className={style.dropdown_wrapper}>
          <IoLanguageOutline className={style.icon} />
          <select
            name="languages"
            id="languages"
            value={i18n.language} // Reflect the current language
            onChange={handleLanguageChange}
            className={style.dropdown}
          >
            <option value="en">{t("English")}</option>
            <option value="hi">{t("हिंदी")}</option>
          </select>
        </div>

       
        <div className={style.nav_container}>
      {loggedIn ? (
        // Show Profile component if logged in
        <div className={style.profile_icon}>
          <Profile />
        </div>
      ) : (
        // Otherwise, show SignIn link
        <div className={style.sign_in}>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? `${style.navlink} ${style.active}` : `${style.navlink}`
            }
          >
            {t("SignIn")}
          </NavLink>
        </div>
      )}
    </div>
  
      </div>
    </div>
  );
}
