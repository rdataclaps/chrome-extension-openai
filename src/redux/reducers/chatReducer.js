const initialState = {
    chats: [],
    error: null,
    currentChat: null
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CHATS_SUCCESS':
            return {
                ...state,
                chats: action.payload,
                error: null,
            };
        case 'GET_CHATS_ERROR':
            return {
                ...state,
                chats: [],
                error: action.payload,
            };
        case 'CREATE_CHAT_SUCCESS':
            return {
                ...state,
                chats: [...state.chats, action.payload],
                error: null,
            };
        case 'CREATE_CHAT_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'UPDATE_CHAT_SUCCESS':
            const updatedChatsAfterUpdate = state.chats.map(chat => {
                if (chat.id === action.payload.id) {
                    return action.payload;
                }
                return chat;
            });
            return {
                ...state,
                chats: updatedChatsAfterUpdate,
                error: null,
            };
        case 'UPDATE_CHAT_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'UPDATE_CURRENT_CHAT':
            return {
                ...state,
                currentChat: action.payload,
            };
        case 'DELETE_CHAT_SUCCESS':
            const updatedChats = state.chats.filter(chat => chat.id !== action.payload.id);
            return {
                ...state,
                chats: updatedChats,
                error: null,
            };
        case 'DELETE_CHAT_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default chatReducer;
