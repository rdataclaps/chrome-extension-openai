import React from "react";
import user from "../assets/Images/Avatar/new_user.png";
import Logo from "../assets/Icons/Logo.svg";
import { useSelector } from 'react-redux';

function Topbar() {
  const attributes = useSelector((state) => state.user.user);
  return (
    <div className="topbar_nav_item">
      <div className="logo">
      <h1>Chrome extension</h1>
      </div>
      <ul className="top_nav_list">
        <div className="user">
          <p>{attributes?.name ? `${attributes?.name} | ` : ''}{attributes?.email}</p>
          {/* <img style={{width: '40px'}} src={user} alt="" /> */}
        </div>
      </ul>
    </div>
  );
}

export default Topbar;
