import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FcDocument, FcMindMap, FcPrivacy } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import Logo from "../Components/assets/Icons/Logo.svg";
import banner_img from "../Components/assets/Images/WebImage/Web_banner_img.png";
import Bg from "../Components/assets/Images/WebImage/bg.png";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the class
  const toggleClass = () => {
    setIsActive(!isActive); // Toggle the state
    setIsMenuOpen(!isMenuOpen);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const web_navbar = `web_navbar ${isSticky ? "sticky" : ""}`;

  return (
    <>
      <div className={web_navbar}>
        <div className="container">
          <nav>
            <div className="logo">
              <h1>ASK MAIL</h1>
            </div>
            <ul className={`nav_menu ${isActive ? "active" : ""}`}>
              <li className="nav_list">
                <ScrollLink
                  to="banner"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="nav_link"
                >
                  Home
                </ScrollLink>
              </li>
              <li className="nav_list">
                <ScrollLink
                  to="our_features"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="nav_link"
                >
                  Features
                </ScrollLink>
              </li>
            
              <li className="nav_list">
                <ScrollLink
                  to="email_address"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="nav_link"
                >
                  Contact
                </ScrollLink>
              </li>
            </ul>

            <div className="btn_area">
              <Link to="/login" className="btn_s">
                Sign In
              </Link>
              <button className="toggle_btn" onClick={toggleClass}>
                {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="main">
        {/* Banner */}
        <section className="banner" id="banner">
          <div className="container">
            <div className="banner_text">
              <div className="text">
                <h1>Ask Anything From Your Email</h1>
              </div>
              <Link to="signup">
                <button className="btn mt-5">Try ASK MAIL for Free</button>
              </Link>
            </div>
            <div className="banner_img">
              <img src={banner_img} alt="" />
            </div>
          </div>
        </section>

        {/* Our Features */}

        <section className="our_features" id="our_features">
          <div className="container">
            <div className="section_title">
              <h2>Our Features</h2>
            </div>
            <div className="row mt-5">
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                <div className="card">
                  <FcDocument className="icons" />
                  <div className="text">
                    <h3>Quick Search Across Multiple Documents</h3>
                    <p className="mt-3">
                      Utilize our FAISS-based search engine for  fast, precise
                      queries across one or  multiple documents.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                <div className="card">
                  <FcMindMap className="icons" />
                  <div className="text">
                    <h3>Intelligent Responses with OpenAI</h3>
                    <p className="mt-3">
                      Powered by OpenAI, get insightful  answers to your
                      questions instantly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4">
                <div className="card">
                  <FcPrivacy className="icons" />
                  <div className="text">
                    <h3>Secure & Private</h3>
                    <p className="mt-3">
                      Your data is encrypted and  never shared with third
                      parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="email_address" id="email_address">
          <div className="container">
            <div className="email_area">
              <div className="section_title">
                <h2>Email Address</h2>
              </div>
              <div className="email">
                <h1>support@askmail.com</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}

        <section className="footer">
          <div className="container">
            <div className="logo">
            <h1>ASK MAIL</h1>
            </div>
            <hr />
            <ul className="nav_menu">
              <li className="nav_list">
                <ScrollLink
                  to="banner"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="nav_link"
                >
                  Home
                </ScrollLink>
              </li>
              <li className="nav_list">
                <ScrollLink
                  to="our_features"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="nav_link"
                >
                  Features
                </ScrollLink>
              </li>
             
              <li className="nav_list">
                <ScrollLink
                  to="email_address"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="nav_link"
                >
                  Contact
                </ScrollLink>
              </li>
              <li><Link to="/tos">Terms</Link></li>
              <li><Link to="/privacy-policy">Privacy</Link></li>
            </ul>
          </div>
        </section>

        <div className="web_bg bg_left">
          <img src={Bg} alt="" />
        </div>
        <div className="web_bg bg_right">
          <img src={Bg} alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
