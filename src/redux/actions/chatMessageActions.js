import { toast } from 'react-toastify';
import authAxios from "../../services/authAxios";
import { getUser } from "./authActions";

export const getMessages = (chatId, signal) => async (dispatch) => {
    try {
        dispatch({ type: 'START_FETCHING_MESSAGES' })
        const response = await authAxios.get('chat-messages?chat_id=' + chatId, { signal });
        dispatch({ type: 'GET_CHAT_MESSAGE_SUCCESS', payload: response.data });
        dispatch(getUser());
    } catch (error) {
        console.log(error)
        if (error.name === 'AbortError') {
            console.log("aborting.........")
        } else {
            dispatch({ type: 'GET_CHAT_MESSAGE_ERROR', payload: error.message });
        }
        toast.error(`${error.message}`);
    }
};

export const createMessage = (message, signal) => async (dispatch) => {
    try {
        const response = await authAxios.post('/chat/queries', message, {
            signal,
        });
        dispatch({ type: 'CREATE_CHAT_MESSAGE_SUCCESS', payload: response.data });
    } catch (error) {
        if (error.name === 'AbortError' || error.name === 'CanceledError') {
            console.error("aborting.........")
            throw error
        } else {
            dispatch({ type: 'CREATE_CHAT_MESSAGE_ERROR', payload: error.message });
        }
    }
};

export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
});