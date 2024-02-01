const initialState = {
    credits: null,
    error: null,
  };
  
  const creditReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'EDIT_CREDIT_SUCCESS':
        return {
          ...state,
          credits: action.payload,
          error: null,
        };
      case 'EDIT_CREDIT_ERROR':
        return {
          ...state,
          credits: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default creditReducer;
  