import { Auth } from 'aws-amplify';
import { setUser, clearUser, loggedInUserIfToken} from './userActions';
import authAxios from "../../services/authAxios";
import Cookies from 'js-cookie';
import axios from "axios"
import {store} from "../index"

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
export const downloadPdf = (setIsDisable)=>async (dispatch)=>{
    let email_id = store.getState()?.user?.userData?.email;
  
    try {
        authAxios.get(`/download-pdf?email=${email_id}`).then(res=>{
            if(res?.data?.download_url){
                authAxios.get(`${res.data.download_url}`,{responseType: "blob"}).then(res=>{
                    let blob = new Blob([res.data],{type: res.data.type})
                    let url = window.URL.createObjectURL(blob, {oneTimeOnly: true})
                    window.open(url)
                    setIsDisable(false)
                })
            }
        })
    
    } catch (error) {
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
     }

     dispatch(setUser(res?.data));
        return { success: true, message: '' };
    } catch (error) {
        return {
            success: false,
            message: error?.message,
        };
    }
};




export const signup = (username, email, password) => async (dispatch) => {
    try {
        const user = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                name: username,
            },
        });
        dispatch(setUser(user));
        // localStorage.setItem('_user', JSON.stringify(user));
        return { success: true, message: '' };
    } catch (error) {
        return {
            success: false,
            message: error?.message,
        };
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