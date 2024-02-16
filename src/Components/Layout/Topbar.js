import React, { useState,useEffect } from "react";
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


  const [previousUrl, setPreviousUrl] = useState('');

  useEffect(() => {
    const handleNavigation = () => {
      setPreviousUrl(window.location.href);
    };

    // Listen for the beforeunload event to detect page navigation
    window.addEventListener('beforeunload', handleNavigation);

    // Clean up the event listener
    return () => {
      window.removeEventListener('beforeunload', handleNavigation);
    };
  }, []);
console.log("proute",previousUrl)
console.log("croute",window.location.href)
  return (
    <div className="topbar_nav_item">
      <div className="logo" style={{display:"flex",justifyContent:"space-between"}}>
      {/* <h1>askmail</h1> */}
      {previousUrl !== window.location.href && (
      <div>
        <Button className="connect-with-gmail" onClick={handleDownloadPDF} type="primary" ghost>Download PDF</Button>
        </div>
      )}
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
