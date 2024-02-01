import authAxios from "../../services/authAxios";
import { getCustomers } from "./customerActions";

export const editCredit = (data) => async (dispatch) => {
    try {
        const payload = { credit: data?.credit, enable_2fa: data?.enable_2fa, role: data?.role }
        const response = await authAxios.put(`admin/user/${data?.customerId}/edit_credit`, payload);
        dispatch({ type: 'EDIT_CREDIT_SUCCESS', payload: response.data });
        dispatch(getCustomers());
    } catch (error) {
        dispatch({ type: 'EDIT_CREDIT_ERROR', payload: error.message });
    }
};
