import { Amplify } from 'aws-amplify';
import React from "react";
import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./Components/Layout/MainLayout";
import Billing from "./Pages/Billing";
import BuyCredits from "./Pages/BuyCredits";
import Contacts from "./Pages/Contacts";
import Dashboard1 from "./Pages/Dashboard1";
import Dashboard2 from "./Pages/Dashboard2";
import ForgotPassword from "./Pages/ForgotPassword";
import Loader from "./Pages/Loader";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Users from "./Pages/Users";
import Verification from "./Pages/Verification";
import awsconfig from './config/aws-export';
import Home from "./Pages/Home";
import PrivacyPolicy from "./Pages/Privacypolicy";
import ResetPassword from "./Pages/ResetPassword";
import TOS from "./Pages/Termsofservice";
import Workspace from "./Pages/Workspace";
import { store } from './redux';
import ProtectedRoutes from "./routes/ProtectedRoute";

Amplify.configure(awsconfig);

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/auth" element={<Loader />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verification" element={<Verification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/tos" element={<TOS />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard1 />} name="dashboard1"/>
                <Route path="/dashboard2" element={<Dashboard2 />} name="dashboard2"/>
                {/* <Route path="/my-profile" element={<MyProfile />} /> */}
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/user" element={<Users />} />
                <Route path="/workspace" element={<Workspace />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/buy-credits" element={<BuyCredits />} />
                {/* <Route path="/payment" element={<Payment />} /> */}
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </Router>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
