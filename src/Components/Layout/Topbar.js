import React, { useState } from "react";
import user from "../assets/Images/Avatar/new_user.png";
import Logo from "../assets/Icons/Logo.svg";
import { useDispatch, useSelector } from 'react-redux';
import {Button} from "antd"
import { downloadPdf, googleLogin } from "../../redux/actions/authActions";
import { openEmailBox } from "../../redux/actions/userActions";

function Topbar() {
  const dispatch = useDispatch()
  const attributes = useSelector((state) => state.user.user);
  const handleGoogleApi =()=>{
    dispatch(googleLogin())
  }
  const handleDownloadPDF =()=>{
    // dispatch(downloadPdf())
    dispatch(openEmailBox(true))
  }

  return (
    <div className="topbar_nav_item">
      <div className="logo" style={{display:"flex",justifyContent:"space-between"}}>
      {/* <h1>askmail</h1> */}
      <div>
        <Button className="connect-with-gmail" onClick={handleDownloadPDF} type="primary" ghost>Download PDF</Button>
        </div>
      <div>
        <Button className="connect-with-gmail" onClick={handleGoogleApi} type="primary" ghost>Connect with Gmail</Button>
        </div>
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
