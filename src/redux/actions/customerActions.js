import { toast } from "react-toastify";
import authAxios from "../../services/authAxios";

export const getCustomers = (queryParams) => async (dispatch) => {
    try {
        let response = null;
        if (!queryParams) {
            dispatch({ type: 'START_FETCHING_CUSTOMERS' })
            response = await authAxios.get('admin/users');
        } else {
            if ('search' in queryParams) {
                dispatch({ type: 'START_FETCHING_CUSTOMERS' })
                response = await authAxios.get(`admin/users?search=${queryParams.search}`);
            }
        }
        dispatch({ type: 'GET_CUSTOMERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_CUSTOMERS_ERROR', payload: error.message });
    }
};


export const deleteCustomer = (customerId) => async (dispatch) => {
    try {
        console.log(customerId)
        dispatch({ type: 'START_FETCHING_CUSTOMERS' })
        const response = await authAxios.delete(`admin/user/${customerId}`);
        dispatch({ type: 'DELETE_CUSTOMER_SUCCESS', payload: response.data });
        dispatch(getCustomers());
    } catch (error) {
        dispatch({ type: 'DELETE_CUSTOMER_ERROR', payload: error.message });
        toast.info(`${error?.message}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        });
    }
};

export const create_user = (formData) => async (dispatch) => {
    try {
        const response = await authAxios.post('users', formData);
        dispatch({ type: 'CREATE_ADD_USER_SUCCESS', payload: response.data });
        dispatch(getCustomers());
    } catch (error) {
        dispatch({ type: 'CREATE_ADD_USER_ERROR', payload: error.message });
    }
};