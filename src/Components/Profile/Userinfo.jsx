import React from 'react'
import style from './Userinfo.module.css'
import { IoLogOutOutline } from 'react-icons/io5'
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { logout } from '../../store/slices/userSlice' // Corrected typo
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function Userinfo() {
  const dispatch = useDispatch();
  const userMobile = localStorage.getItem("userMobile");
  const lastFourDigits = userMobile ? userMobile.slice(-4) : '';
  function handleLogout() {
    // Dispatch the logout action to update the state
    dispatch(logout());
    toast.success('Logout Successful')
    // You can also clear local storage and redirect here
    localStorage.removeItem("userMobile");
    localStorage.removeItem("isAuthenticated");
    navigate("/signin"); // Redirect to the sign-in page
  }

  return (
    <div className={style.wrapper_userinfo}>
      <div id={style.wel}><span>Welcome</span>{`****${lastFourDigits}`}</div>
      <div id={style.i1}><span><CgProfile/></span>My profile</div>
      <div id={style.i2}><span><MdOutlineEdit/></span>Edit profile</div>
      <div id={style.i3}><span><MdOutlineSubscriptions/></span>Subscriptions</div>
      <div id={style.i4} onClick={handleLogout}><span><IoLogOutOutline/></span>Logout</div>
    </div>
  )
}
