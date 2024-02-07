import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogInputField from "../Components/InputField/LogInputField";
import PasswordInput from "../Components/InputField/PasswordInput";
import Logo from "../Components/assets/Icons/Logo.svg";
import Login_img from "../Components/assets/Images/Login.png";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/actions/authActions";
import { toast } from "react-toastify";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "otp") {
      setOtp(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(email, password, otp))
      .then(() => {
        toast.success(`New Password updated successfully`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
          autoClose: 2000,
        });
        navigate("/");
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
              <h2>ASK MAIL</h2>
              <div className="lang_selector">
                <p>
                  Don’t have an account? <Link to="/">Sign In!</Link>
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
                  onChange={(e) => handleInputChange(e)}
                />
                <PasswordInput
                  name="password"
                  type="password"
                  value={password}
                  placeholder="New Password"
                  onChange={(e) => handleInputChange(e)}
                />
                <PasswordInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => handleInputChange(e)}
                />
                <PasswordInput
                  name="otp"
                  type="password"
                  value={otp}
                  placeholder="OTP"
                  onChange={(e) => handleInputChange(e)}
                />
                {/* <Link to="/dashboard"> */}
                <button className="btn" onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
                {/* </Link> */}
              </form>
            </div>
            <div className="logIn_footer">
              <Link to="">Privacy Policy</Link>
              <p>Copyright 2024</p>
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

export default ResetPassword;
