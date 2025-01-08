import React from "react";
import style from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={style.footer_wrapper}>
        <p>Question? call 000-467-865-3876</p>
      <div>
        <span>FAQ</span>
        <span>Privacy</span>
        <span>Accounts</span>
      </div>
      <div>
        <span>Help</span>
        <span>preferences</span>
        <span>information</span>
      </div>
      <div>
        <span>Media</span>
        <span>Contact</span>
        <span>Terms</span>
      </div>
      <div>MovieDekho</div>
    </div>
  );
}
