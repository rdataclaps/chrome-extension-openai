const initialState = {
    messages: [],
    error: null,
    fetching: false
};

const chatMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_FETCHING_MESSAGES':
            return {
                ...state,
                // messages: [...state.messages],
                error: null,
                fetching: true
            }
        case 'GET_CHAT_MESSAGE_SUCCESS':
            return {
                ...state,
                messages: action.payload,
                error: null,
                fetching: false
            };
        case 'GET_CHAT_MESSAGE_ERROR':
            return {
                ...state,
                messages: [],
                error: action.payload,
                fetching: false
            };
        case 'CREATE_CHAT_MESSAGE_SUCCESS':
            const transformedData = [];
            action.payload.forEach((value, index) => {
                transformedData.push({
                    message_text: value?.question,
                    message_type: 'question',
                    context_text: null,
                    message_metadata: null
                });
                transformedData.push({
                    message_text: value?.answer,
                    message_type: 'answer',
                    context_text: value?.context,
                    message_metadata: value?.metadata,
                });
            });
            return {
                ...state,
                messages: [...state.messages.slice(0, -1), ...transformedData],
                error: null,
            };
        case 'CREATE_CHAT_MESSAGE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
                error: null,
            };
        default:
            return state;
    }
};

export default chatMessageReducer;
