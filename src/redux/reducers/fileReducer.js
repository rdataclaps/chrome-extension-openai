const initialState = {
    files: [],
    error: null,
  };
  
  const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_FILES_SUCCESS':
        return {
          ...state,
          files: action.payload,
          error: null,
        };
      case 'GET_FILES_ERROR':
        return {
          ...state,
          files: [],
          error: action.payload,
        };
      case 'UPLOAD_FILE_SUCCESS':
        return {
          ...state,
          // files: [...state.files, action.payload],
          error: null,
        };
      case 'UPLOAD_FILE_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'DOWNLOAD_FILE_SUCCESS':
        return {
          ...state,
          error: null,
        };
      case 'DOWNLOAD_FILE_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_FILE_SUCCESS':
        console.log("HERE: ", action.payload);
        const updatedFiles = state.files.filter(file => file.id !== action.payload);
        return {
          ...state,
          files: updatedFiles,
          error: null,
        };
      case 'DELETE_FILE_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default fileReducer;
  