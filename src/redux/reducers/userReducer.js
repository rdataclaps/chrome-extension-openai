import Cookies from "js-cookie";

const initialState = {
  user: null,
  userData: null,
  isAuthenticated: false,
  forgotPasswordSuccess: false,
  forgotPasswordError: null,
  changePasswordSuccess: false,
  changePasswordError: null,
  error: null,
};
  
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      case 'LOGGED_IN_USER_IF_TOKEN':
        return{
          ...state,
          user :action.payload,
          isAuthenticated:true,
        }
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordError: null,
      };
    case 'FORGOT_PASSWORD_ERROR':
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordError: action.payload,
      };
    case 'CHANGE_PASSWORD_SUCCESS':
      return {
        ...state,
        changePasswordSuccess: true,
        changePasswordError: null,
      };
    case 'CHANGE_PASSWORD_ERROR':
      return {
        ...state,
        changePasswordSuccess: false,
        changePasswordError: action.payload,
      };
    case 'GET_USER_CREDIT_SUCCESS':
      Cookies.set('role', JSON.stringify({
        enable_2fa: action.payload?.enable_2fa,
        role: action.payload?.role,
        is_admin: action.payload?.is_admin,
        team: action.payload?.team
      }));
      return {
        ...state,
        userData: action.payload,
        user: action.payload?.auth_info,
        isAuthenticated: true,
        error: null,
      };
    case 'GET_USER_CREDIT_ERROR':
      return {
        ...state,
        userData: null,
        error: action.payload,
      };
  
    default:
      return state;
  }
};

export default userReducer;
  