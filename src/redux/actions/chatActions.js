import authAxios from "../../services/authAxios";

export const getChats = () => async (dispatch) => {
    try {
        const response = await authAxios.get('chat');
        dispatch({ type: 'GET_CHATS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_CHATS_ERROR', payload: error.message });
    }
};

export const createChat = (chat) => async (dispatch) => {
    try {
        const response = await authAxios.post('/chat', chat);
        dispatch({ type: 'CREATE_CHAT_SUCCESS', payload: response.data });
        dispatch(getChats());
    } catch (error) {
        dispatch({ type: 'CREATE_CHAT_ERROR', payload: error.message });
    }
};

export const updateChat = (chat) => async (dispatch) => {
    try {
        const response = await authAxios.put('chat', chat);
        dispatch({ type: 'UPDATE_CHAT_SUCCESS', payload: chat });
        dispatch(getChats());
    } catch (error) {
        dispatch({ type: 'UPDATE_CHAT_ERROR', payload: error.message });
    }
};

export const updateCurrentChat = (currentChat) => async (dispatch) => {
    dispatch({ type: 'UPDATE_CURRENT_CHAT', payload: currentChat });
};

export const deleteChat = (chat) => async (dispatch) => {
    try {
        const response = await authAxios.delete('chat', {data:chat});
        dispatch({ type: 'DELETE_CHAT_SUCCESS', payload: {data:response.data, id: chat.chat_id} });
    } catch (error) {
        dispatch({ type: 'DELETE_CHAT_ERROR', payload: error.message });
    }
};
