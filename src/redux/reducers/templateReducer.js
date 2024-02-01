const initialState = {
    templates: [],
    error: null,
};

const templateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TEMPLATE_SUCCESS':
            return {
                ...state,
                templates: action.payload,
                error: null,
            };
        case 'GET_TEMPLATE_ERROR':
            return {
                ...state,
                templates: [],
                error: action.payload,
            };
        case 'CREATE_TEMPLATE_SUCCESS':
            return {
                ...state,
                templates: [...state.templates, action.payload],
                error: null,
            };
        case 'CREATE_TEMPLATE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'UPDATE_TEMPLATE_SUCCESS':
            const updatedTemplatesAfterUpdate = state.templates.map(template => {
                if (template.id === action.payload.id) {
                    return action.payload;
                }
                return template;
            });
            return {
                ...state,
                templates: updatedTemplatesAfterUpdate,
                error: null,
            };
        case 'UPDATE_TEMPLATE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'DELETE_TEMPLATE_SUCCESS':
            const updatedTemplates = state.templates.filter(template => template.id !== action.payload.id);
            return {
                ...state,
                templates: updatedTemplates,
                error: null,
            };
        case 'DELETE_TEMPLATE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default templateReducer;
