import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogInputField from "../Components/InputField/LogInputField";
import PasswordInput from "../Components/InputField/PasswordInput";
import Logo from "../Components/assets/Icons/Logo.svg";
import Login_img from "../Components/assets/Images/Login.png";
import { setUser } from "../redux/actions/userActions";
import { signin } from "../redux/actions/authActions";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated} = useSelector((state)=>state.user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signin(username,password))
  
      // let idToken = user?.signInUserSession.getIdToken();
      // dispatch(setUser(idToken?.payload));
      // navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error", error);
      toast.info(`${error?.message}`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const googleSignIn = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  };

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
  //     console.log("Inside hub: ", event, data);
  //     switch (event) {
  //       case "signIn":
  //         let idToken = data.signInUserSession.getIdToken();
  //         dispatch(setUser(idToken?.payload));
  //         Cookies.set("isAuthenticated", "true");
  //         navigate("/dashboard");
  //         break;
  //       case "signOut":
  //         Cookies.remove("isAuthenticated");
  //         setUser(null);
  //         break;
  //       default:
  //         // set custom state
  //         break;
  //     }
  //   });

  //   return unsubscribe;
  // }, [dispatch, navigate]);

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/dashboard")
    }
  },[isAuthenticated])

  return (
    <div className="logIn_page">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="login_form">
            <div className="login_header">
              <Link to="/">
                {" "}
                <h2>Chrome extension</h2>
              </Link>
              <div className="lang_selector">
                <p>
                  Don’t have an account? <Link to="/Signup">Sign up!</Link>
                </p>
              </div>
            </div>
            <div className="form_area">
              <div className="mb-5">
                <h1>Welcome Back</h1>
                <p className="mt-2 desc">
                  <b>Login into your account</b>
                </p>
              </div>
              <form className="input_form" onSubmit={handleSubmit}>
                <LogInputField
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username or email"
                  onChange={handleNameChange}
                />
                <PasswordInput
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handlePassChange}
                />
                <div className="forget_area">
                  <span className="remember_me">
                    <input type="checkbox" className="redio_input" />
                    <p>Remember me</p>
                  </span>
                  <Link to="/forgot-password" className="fuP">
                    Forgot Password?
                  </Link>
                </div>
                {/* <Link to="/dashboard"> */}
                <button className="btn" type="submit">
                  Sign In
                </button>
                {/* </Link> */}
              </form>
              {/* <div className="social_media">
                <p>Or continue with</p>
                <div className="social_group">
                  <div
                    className="social_group_btn"
                    style={{ width: "100%" }}
                    onClick={googleSignIn}
                  >
                    <FcGoogle className="icons" />
                    <span style={{ display: "block" }}>
                      Sign in with Google
                    </span>
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
        {/* <div className="col-lg-5 col-md-12 col-sm-12">
          <div className="login_img">
            <img src={Login_img} alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SignIn;
