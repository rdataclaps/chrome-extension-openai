import authAxios from "../../services/authAxios";

export const getTemplates = () => async (dispatch) => {
    try {
        const response = await authAxios.get('templates');
        dispatch({ type: 'GET_TEMPLATE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_TEMPLATE_ERROR', payload: error.message });
    }
};

export const createTemplate = (template) => async (dispatch) => {
    try {
        const response = await authAxios.post('create-template', template);
        dispatch({ type: 'CREATE_TEMPLATE_SUCCESS', payload: response.data });
        dispatch(getTemplates());
    } catch (error) {
        dispatch({ type: 'CREATE_TEMPLATE_ERROR', payload: error.message });
    }
};

export const updateTemplate = (template) => async (dispatch) => {
    try {
        const response = await authAxios.put(`template/${template.id}`, template);
        dispatch({ type: 'UPDATE_TEMPLATE_SUCCESS', payload: template });
        dispatch(getTemplates());
    } catch (error) {
        dispatch({ type: 'UPDATE_TEMPLATE_ERROR', payload: error.message });
    }
};

export const deleteTemplate = (template) => async (dispatch) => {
    try {
        console.log(template);
        const response = await authAxios.delete(`template/${template.id}`, {data:template});
        dispatch({ type: 'DELETE_TEMPLATE_SUCCESS', payload: {data:response.data, id: template.id} });
    } catch (error) {
        dispatch({ type: 'DELETE_TEMPLATE_ERROR', payload: error.message });
    }
};
