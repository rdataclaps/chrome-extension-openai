import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogInputField from "../Components/InputField/LogInputField";
import Logo from "../Components/assets/Icons/Logo.svg";
import Login_img from "../Components/assets/Images/Login.png";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/actions/authActions";
import { toast } from "react-toastify";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email))
      .then(() => {
        toast.info(
          "OTP has been sent to your email. Please check your inbox.",
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            autoClose: 2000,
          }
        );
        navigate("/reset-password");
      })
      .catch((error) => {
        console.error("Forgot password error", error);
        toast.info(`${error}`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="logIn_page">
      <div className="row">
        <div className="col-lg-7 col-md-12 col-sm-12">
          <div className="login_form">
            <div className="login_header">
              <Link to="/">
                {" "}
                <h2>DOCUBARK</h2>
              </Link>
              <div className="lang_selector">
                <p>
                  Have An Account?<Link to="/login">Sign In!</Link>
                </p>
              </div>
            </div>
            <div className="form_area">
              <div className="mb-5">
                <h1>Forgot Your Password</h1>
                <p className="mt-2">
                  Enter your registered email to reset your password
                </p>
              </div>
              <form action="" className="input_form">
                <LogInputField
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
                {/* <Link to="/dashboard"> */}
                <button
                  className="btn"
                  onClick={(e) => handleForgotPassword(e)}
                >
                  Sent OTP
                </button>
                {/* </Link> */}
              </form>
            </div>
            <div className="logIn_footer">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <p>Copyright 2023</p>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-12 col-sm-12">
          <div className="login_img">
            <img src={Login_img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
