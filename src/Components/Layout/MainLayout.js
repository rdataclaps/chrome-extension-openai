import { Button, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenu, BiX } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { MdWorkspaces } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbWallet } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser, googleLogin, signOut } from "../../redux/actions/authActions";
import Logo from "../assets/Icons/Logo.svg";
import AskForEmailDialogBox from "../DialogBox/AskForEmailDialogBox";
import "./Navbar.css";
import Topbar from "./Topbar";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const mainMenuItems = [
    {
      key: "dashboard1",
      icon: <RxDashboard />,
      label: "Dashboard",
    },
    // {
    //   key: "dashboard2",
    //   icon: <RxDashboard />,
    //   label: "Dashboard 2",
    // },
    // // {
    // //   key: "my-profile",
    // //   icon: <HiOutlineUser />,
    // //   label: "My Profile",
    // // },
    // {
    //   key: "billing",
    //   icon: <TbWallet />,
    //   label: "Billing",
    // },
    // {
    //   key: "user",
    //   icon: <FiUsers />,
    //   label: "Users",
    // },
    // {
    //   key: "workspace",
    //   icon: <MdWorkspaces />,
    //   label: "Workspace",
    // },
  ];
  const mainMenuItems2 = [
    {
      key: "logout",
      icon: <AiOutlineLogout />,
      label: "Log Out",
    },
  ];

  const [toggleBar, setToggleBar] = useState(false);
  const [activeItem, setActiveItem] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setActiveItem(currentPath || "dashboard1");
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleMenuItemClick = (itemKey) => {
    if (itemKey === "logout") {
      dispatch(signOut());
    } else {
      setActiveItem(itemKey);
      navigate(`/${itemKey}`);
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <AskForEmailDialogBox isModalOpen={true} /> */}
      <Sider
        trigger={null}
        className={toggleBar ? "hide_side_navbar" : "side_navbar"}
      >
        <div className="demo-logo-vertical logo">
          <h1 style={{color:"#3f3f46"}}>Chrome extension</h1>
         {toggleBar && 
         <BiX className="icons" onClick={() => setToggleBar(!toggleBar)}/>} 
        </div>
        <div className="side_bar_menu_list">
          <div className="sidebar_top"> 
            <Menu theme="dark" mode="inline" selectedKeys={[activeItem]}>
              {mainMenuItems.map((menuItem) => {
                if (menuItem.key === "user" && !userData?.is_admin) {
                  return null;
                }
                return (
                  <Menu.Item
                    key={menuItem.key}
                    icon={menuItem.icon}
                    onClick={() => handleMenuItemClick(menuItem.key)}
                    className="sidebar-heading"
                    style={{color: '#fff',background:"#0ea5e1"}}
                  >
                   <p style={{color: '#fff'}}> {menuItem.label}</p>
                  </Menu.Item>
                );
              })}
            </Menu>
            {/* <div className="nav_credits_area">
              <div className="info">
                <p>Credits</p>
                <p>{userData ? parseInt(userData?.credit) : 0}</p>
              </div>
              <Link to="/buy-credits">
                <button className="btn">Buy Credits</button>
              </Link>
            </div> */}
          </div>
          <div className="sidebar_bottom">

            <Menu theme="dark" mode="inline" selectedKeys={[activeItem]}>
              {mainMenuItems2.map((menuItem) => (
                <Menu.Item
                  key={menuItem.key}
                  icon={menuItem.icon}
                  onClick={() => handleMenuItemClick(menuItem.key)}
                  style={{backgroundColor:"#ef4444",color:"#fff"}}
                >
                 <p style={{color:"#fff"}}> {menuItem.label}</p>
                </Menu.Item>
              ))}
            </Menu>
            <hr />
            <div className="sidenav_user">
              <Link to="/tos">Terms</Link>
              <span>|</span>
              <Link to="/privacy-policy">Privacy</Link>
            </div>
          </div>
        </div>
      </Sider>
      <Layout className={toggleBar ? "hide_body_layout" : "body_layout"}>
        <Header
          className="fixed-header"
          style={{
            padding: 0,
            minHeight: 65,
          }}
        >
          <Button
            type="text"
            className="header_toggle_btn"
            icon={
              toggleBar ? (
                <BiX className="icons" />
              ) : (
                <BiMenu className="icons" />
              )
            }
            onClick={() => setToggleBar(!toggleBar)}
          />
          <Topbar />
        </Header>
        <Content
          // className="body_content"
          style={{
            // margin: "24px 24px",
            padding: 24,
            minHeight: 100,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
