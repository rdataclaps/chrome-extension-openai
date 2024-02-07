import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import LogInputField from "../Components/InputField/LogInputField";
import PasswordInput from "../Components/InputField/PasswordInput";
import Logo from "../Components/assets/Icons/Logo.svg";
import Login_img from "../Components/assets/Images/Login.png";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/authActions";
import { toast } from 'react-toastify';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';


function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isNesRegistration} = useSelector((state)=>state.user)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  dispatch(signup(username, email, password));
  };

  const googleSignIn = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    });
  }
useEffect(()=>{
if(isNesRegistration){
  navigate("/login")
}
},[isNesRegistration])
  return (
    <div className="logIn_page">
      <div className="row">
        {/* <div className="col-lg-5 col-md-12 col-sm-12">
          <div className="login_img">
            <img src={Login_img} alt="" />
          </div>
        </div> */}
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="login_form">
            <div className="login_header">
              <Link to="/">
              <h2>ASK MAIL</h2>
              </Link>
              <div className="lang_selector">
                <p>
                  Have An Account? <Link to="/login">Sign In!</Link>
                </p>
              </div>
            </div>
            <div className="form_area">
              <div className="mb-5">
                <h1>Get Started With ASK MAIL</h1>
                <p className="mt-2 desc">
                  <b>Create your account</b>
                </p>
              </div>
              <form className="input_form" onSubmit={handleSignup}>
                <LogInputField
                  name="name"
                  type="text"
                  value={username}
                  placeholder="Full Name"
                  onChange={handleUsernameChange}
                />
                <LogInputField
                  name="username"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
                <PasswordInput
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handlePassChange}
                />
                {/* <Link to="/dashboard"> */}
                  <button className="btn" type="submit">Create Account</button>
                {/* </Link> */}
              </form>
              {/* <div className="social_media">
                <p>Or continue with</p>
                <div className="social_group">
                  <div className="social_group_btn" style={{width: '100%'}} onClick={googleSignIn}>
                    <FcGoogle className="icons" />
                    <span style={{display: 'block'}}>Sign up with Google</span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="logIn_footer">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span>|</span>
              <Link to="/tos">Terms of Service</Link>
              <p>Copyright 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
