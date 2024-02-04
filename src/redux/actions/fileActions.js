import authAxios from "../../services/authAxios";

export const getFiles = () => async (dispatch) => {
    try {
        const response = await authAxios.get('/get-train-data');
        dispatch({ type: 'GET_FILES_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_FILES_ERROR', payload: error.message });
    }
};

export const uploadFile = (file, chatSpecific) => async (dispatch, getState) => {
    try {
        const { currentChat } = getState().chat;
        if (currentChat) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('chat_id', chatSpecific ? currentChat.id : "null");
            await authAxios.post('/train', formData);
            dispatch({ type: 'UPLOAD_FILE_SUCCESS' });
            dispatch(getFiles());
        } else {
            dispatch({ type: 'UPLOAD_FILE_ERROR', payload: "Must select chat" });
        }
    } catch (error) {
        dispatch({ type: 'UPLOAD_FILE_ERROR', payload: error.message });
    }
};

export const deleteFile = (data_id, file_name, customer_id) => async (dispatch) => {
    try {
        const response = await authAxios.post('delete', { data_id, file_name, customer_id });
        dispatch({ type: 'DELETE_FILE_SUCCESS', payload: data_id });
    } catch (error) {
        dispatch({ type: 'DELETE_FILE_ERROR', payload: error.message });
    }
};
