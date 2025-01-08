import React, { useState } from "react";
import style from "./Profile.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IoLogOutOutline } from "react-icons/io5";
import Userinfo from "./Userinfo";

export default function Profile() {
  const [showUserInfo, setShowUserInfo] = useState(false); // State to toggle Userinfo

  const handleProfileClick = () => {
    setShowUserInfo((prev) => !prev); // Toggle Userinfo visibility
  };

  return (
    <div className={style.profile_wrapper}>
      <div onClick={handleProfileClick} className={style.profile_icon_wrapper}>
        <AccountCircleIcon className={style.profile_icon} />
      </div>
      {showUserInfo && (
        <div className={style.userinfo_wrapper}>
          <Userinfo />
        </div>
      )}
    </div>
  );
}
