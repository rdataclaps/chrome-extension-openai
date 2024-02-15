import { Auth } from 'aws-amplify';
import { setUser, clearUser, loggedInUserIfToken, setNewRegistraion} from './userActions';
import authAxios from "../../services/authAxios";
import Cookies from 'js-cookie';
import axios from "axios"
import {store} from "../index"
import { toast } from 'react-toastify';
import { getFiles } from './fileActions';

export const googleLogin = () => async (dispatch) => {
    try {
     const res = await authAxios.get('/login/google')

     if(res?.data.url){
             window.open(res.data.url,'_blank')
     }
    } catch (error) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
export const downloadPdf = (email) => async (dispatch)=>{
    // let email_id = store.getState()?.user?.userData?.email;
  
    try {
        const res = await authAxios.get(`/download-pdf?email=${email}`);
        if (res.data?.download_url) {
            try {
                const fileData = await authAxios.get(`${res.data.download_url}`,{responseType: "blob"});
                let blob = new Blob([fileData.data],{type: fileData.data.type});
                // let url = window.URL.createObjectURL(blob, {oneTimeOnly: true});
                // window.open(url)
                const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
            a.href = url;
            a.download = 'document.pdf'; 
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
                dispatch(getFiles());
            } catch (e) {
                console.log(e);
                dispatch(getFiles());
                return {
                    success: false,
                    message: e?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'invalid data',
            };
        }
    
    } catch (error) {
        console.log(error)
        toast.error(`Unable to Download: ${error.response.data.detail}`);
        return {
            success: false,
            message: error?.message,
        };
    }
}

export const signin = (email, password) => async (dispatch) => {
    try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`,{ email, password })
     if(res?.data){
         Cookies.set('isAuthenticated', JSON.stringify(res?.data))
         dispatch(setUser(res?.data));
         return { success: true, message: '' };
     }else {
        toast.error('Sign-in failed: No data received from the server.');
        return { success: false, message: 'No data received from the server.' };
    }

    } catch (error) {
        console.log(error.message)
        if (error.response) {
            toast.error(`Sign-in failed: ${error.response.data.detail}`);
            return { success: false, message: error.response.data.detail };
        } else if (error.request) {
            toast.error('Sign-in failed: No response received from the server.');
            return { success: false, message: 'No response received from the server.' };
        } else {
            toast.error(`Sign-in failed: ${error.message}`);
            return { success: false, message: error?.message };
        }
    }
};




export const signup = (username, email, password) => async (dispatch) => {
    try {
        let payload = {
            email: email,
            password: password,
            attributes: {
                name: username,
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, payload);
        if(res?.data){
            // dispatch(setUser(res?.data));
            dispatch(setNewRegistraion(res?.data,true))
        }
    } catch (error) {
    if (error.response) {
        const errorMessage = error.response.data.message || 'Unknown error occurred';
        toast.error(`Sign-up failed: ${errorMessage}`);
    } else if (error.request) {
        toast.error('Network error. Please check your internet connection.');
    } else {
        toast.error(`Sign-up failed: ${error.message}`);
    }
    console.error('API Error:', error);
    }
};

export const loggedInUserAfterRefresh = (data) => async (dispatch) => {
    dispatch(loggedInUserIfToken(data))
}


export const signOut = () => async (dispatch) => {
    try {
        // Cookies.remove('isAuthenticated');
        Object.keys(Cookies.get()).forEach(function(cookieName) {
            Cookies.remove(cookieName);
        });
        dispatch(clearUser());
        await Auth.signOut();
        console.log('User signed out');
        window.location.reload();
    } catch (error) {
        console.error('Error signing out:', error);
    }
}


// export const refreshToken = () => async (dispatch) => {
//     try {
//         const session = await Auth.currentSession();

//         // Optionally, check if the access token is expired and needs to be refreshed
//         // Note: This is not a built-in Amplify method and may require custom logic.
//         const accessTokenExpiration = new Date(session.getAccessToken().getExpiration() * 1000);
//         const currentTime = new Date();

//         if (currentTime >= accessTokenExpiration) {
//             // Access token is expired; refresh it
//             const refreshedSession = await Auth.currentAuthenticatedUser();
//             dispatch(setUser(refreshedSession));
//         }
//         console.log('Tokens refreshed successfully');
//     } catch (error) {
//         console.error('Error refreshing tokens:', error);
//         dispatch(signOut());
//     }
// };


export const forgotPassword = (email) => async (dispatch) => {
    try {
        await Auth.forgotPassword(email);
        dispatch({ type: 'FORGOT_PASSWORD_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'FORGOT_PASSWORD_ERROR', payload: error.message });
    }
};


export const changePassword = (email, newPassword, confirmationCode) => async (dispatch) => {
    try {
        await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
        dispatch({ type: 'CHANGE_PASSWORD_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'CHANGE_PASSWORD_ERROR', payload: error.message });
    }
};


export const getUser = () => async (dispatch) => {
    try {
        const response = await authAxios.get('/me');
        dispatch({ type: 'GET_USER_CREDIT_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_USER_CREDIT_ERROR', payload: error.message });
    }
};