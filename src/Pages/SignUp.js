import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import LogInputField from "../Components/InputField/LogInputField";
import PasswordInput from "../Components/InputField/PasswordInput";
import Logo from "../Components/assets/Icons/Logo.svg";
import Login_img from "../Components/assets/Images/Login.png";
import { useDispatch } from "react-redux";
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
    const result = await dispatch(signup(username, email, password));
    if (result.success) {
      navigate("/verification", { state: { password } });
    } else {
      // alert(result.message);
      console.log(result)
      toast.error(`Sign-up failed. ${result.message}`);
    }
  };

  const googleSignIn = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google
    });
  }

  return (
    <div className="logIn_page">
      <div className="row">
        <div className="col-lg-5 col-md-12 col-sm-12">
          <div className="login_img">
            <img src={Login_img} alt="" />
          </div>
        </div>
        <div className="col-lg-7 col-md-12 col-sm-12">
          <div className="login_form">
            <div className="login_header">
              <Link to="/">
              <h2>Chrome extension</h2>
              </Link>
              <div className="lang_selector">
                <p>
                  Have An Account? <Link to="/login">Sign In!</Link>
                </p>
              </div>
            </div>
            <div className="form_area">
              <div className="mb-5">
                <h1>Get Started With Chrome extension</h1>
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
              <div className="social_media">
                <p>Or continue with</p>
                <div className="social_group">
                  <div className="social_group_btn" style={{width: '100%'}} onClick={googleSignIn}>
                    <FcGoogle className="icons" />
                    <span style={{display: 'block'}}>Sign up with Google</span>
                  </div>
                  {/* <Link to="#">
                    <FaFacebook className="icons fb_icon" /> Facebook
                  </Link> */}
                </div>
              </div>
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
