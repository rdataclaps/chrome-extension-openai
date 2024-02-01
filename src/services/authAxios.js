import axios from 'axios';
import Cookies from 'js-cookie';
import { store } from '../redux';

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

authAxios.interceptors.request.use(
    (config) => {
        // const lastAuthUserKey = `CognitoIdentityServiceProvider.${process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID}.LastAuthUser`;
        // const lastAuthUser = Cookies.get(lastAuthUserKey);
        // const idTokenKey = `CognitoIdentityServiceProvider.${process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID}.${lastAuthUser}.idToken`;
        // const idToken = Cookies.get(idTokenKey);
        // const accessToken = idToken;
        const accessToken = store.getState()?.user?.user?.access_token;
        if (accessToken) {
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authAxios;