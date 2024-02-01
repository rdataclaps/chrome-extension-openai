const initialState = {
    customers: [],
    error: null,
    fetching: false
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_FETCHING_CUSTOMERS':
        return {
          ...state,
          error: null,
          fetching: true
        };
      case 'GET_CUSTOMERS_SUCCESS':
        return {
          ...state,
          customers: action.payload,
          error: null,
          fetching: false
        };
      case 'GET_CUSTOMERS_ERROR':
        return {
          ...state,
          customers: [],
          error: action.payload,
          fetching: false
        };
      case 'DELETE_CUSTOMER_SUCCESS':
        const updatedCustomers = state.customers.filter(customer => customer.id !== action.payload);
        return {
          ...state,
          customers: updatedCustomers,
          error: null,
          fetching: false
        };
      case 'DELETE_CUSTOMER_ERROR':
        return {
          ...state,
          error: action.payload,
          fetching: false
        };
      case 'CREATE_ADD_USER_SUCCESS' : 
        return {
          ...state,
          customers: [...state.customers, action.payload],
          error: null,
        }
      case 'CREATE_ADD_USER_ERROR' : 
        return {
          ...state,
          error: action.payload,
        }
      default:
        return state;
    }
  };
  
  export default customerReducer;
  