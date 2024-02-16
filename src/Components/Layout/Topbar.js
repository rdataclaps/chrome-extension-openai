import React, {useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Button} from "antd"
import {getUser, googleLogin } from "../../redux/actions/authActions";
import { openEmailBox } from "../../redux/actions/userActions";

function Topbar() {
  const dispatch = useDispatch()
  const attributes = useSelector((state) => state?.user?.user);
  const download_flag = useSelector((state)=>state?.user?.userData?.download_flag)
  
  const handleGoogleApi =()=>{
    dispatch(googleLogin())
  }
  const handleDownloadPDF =()=>{
    // dispatch(downloadPdf())
    dispatch(openEmailBox(true))
  }

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);
  return (
    <div className="topbar_nav_item">
      <div className="logo" style={{display:"flex",justifyContent:"space-between"}}>
      {/* <h1>askmail</h1> */}
      {download_flag && (
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
