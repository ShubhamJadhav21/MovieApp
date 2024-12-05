import React from "react";
import { IoLanguageOutline } from "react-icons/io5";
import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const handleLanguageChange = (event) => {
    console.log(`Selected language: ${event.target.value}`);
  };

  return (
    <div className={style.nav_wrapper}>
      <div className={style.logo}>MovieDekho</div>
      <div className={style.nav_right}>
        <div className={style.dropdown_wrapper}>
          <IoLanguageOutline className={style.icon} />
          <select
            name="languages"
            id="languages"
            onChange={handleLanguageChange}
            className={style.dropdown}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className={style.sign_in}>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? `${style.navlink} ${style.active}`
                : `${style.navlink}`
            }
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
