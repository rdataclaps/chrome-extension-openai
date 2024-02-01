const initialState = {
    receiptData: null,
};

const receiptReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_RECEIPT_DATA":
            return {
                ...state,
                receiptData: action.payload,
            };
        default:
            return state;
    }
};

export default receiptReducer;