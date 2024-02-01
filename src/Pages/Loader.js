import { Auth } from 'aws-amplify';
import Cookies from "js-cookie";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateReceiptData } from "../redux/actions/receiptActions";
export default function Loader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const session = await Auth.currentSession();
                if (session) {
                    Cookies.set('isAuthenticated', 'true');
                    navigate("/dashboard1");
                    dispatch(updateReceiptData(null));
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                navigate("/login");
            }
        }

        checkAuthStatus();
    }, [dispatch, navigate]);

    return (
        <div style={{ background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* <img alt="loader" src={LoaderImg} /> */}
            <div className="snippet" style={{paddingLeft: '20px'}} data-title="loader-dot-falling">
                <div className="stage">
                    <div className="loader-dot-falling"></div>
                </div>
            </div>
        </div>
    );

}