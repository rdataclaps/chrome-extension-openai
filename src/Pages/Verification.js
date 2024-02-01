import { Auth } from 'aws-amplify';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/actions/userActions";

function Verification() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const username = useSelector(state => {
        return state.user?.user?.user?.username
    })
    const passwordFromState = location.state && location.state.password;

    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            await Auth.confirmSignUp(username, code);
            const user = await Auth.signIn(username, passwordFromState);
            let idToken = user?.signInUserSession.getIdToken();
            dispatch(setUser(idToken?.payload));
            Cookies.set('isAuthenticated', 'true');
            navigate("/dashboard1");
        } catch (error) {
            console.error("Verification error", error);
            toast.info(`${error.message}`, {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                autoClose: 2000
            });
        }
    };
    return (
        <div>
            <form onSubmit={handleVerification}>
                <label>Verification Code:</label><br />
                <input
                    type="text"
                    value={code}
                    style={{ width: '500px' }}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
}

export default Verification;
