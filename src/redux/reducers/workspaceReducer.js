const initialState = {
    teams: [],
    inviteDetails: {},
    teamDetails: {},
    error: null,
    fetching: false
};

const workspaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_WORKSPACETEAM_SUCCESS':
            return {
                ...state,
                teamDetails:action.payload,
                error: null,
            };
        case 'GET_WORKSPACETEAM_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'START_FETCHING_WORKSPACE_MEMBERS':
            return {
                ...state,
                error: null,
                fetching: true
            };
        case 'TEAM_WORKSPACE_MEMBER_SUCCESS':
            return {
               ...state,
               teams: action.payload,
               error: null,
               fetching: false
            };
        case 'TEAM_WORKSPACE_MEMBER_ERROR':
           return {
               ...state,
               teams:[],
               error: action.payload,
               fetching: false
           };
        case 'ADD_WORKSPACE_SUCCESS':
            return {
                ...state,
                error: null,
            };
        case 'ADD_WORKSPACE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'UPDATE_WORKSPACE_SUCCESS':
            return {
                ...state,
                teamDetails : action.payload,
                error: null,
            };
        case 'UPDATE_WORKSPACE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'INVITE_WORKSPACE_SUCCESS':
            return {
                ...state,
                error: null,
            };
        case 'INVITE_WORKSPACE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'DELETE_WORKSPACE_MEMBER_SUCCESS':
            const teams = state.teams.filter(teams => teams.user_id !== action.payload.user_id);
            return {
                ...state,
                teams: teams,
                error: null,
            };
            case 'DELETE_WORKSPACE_MEMBER_ERROR':
                return {
                    ...state,
                        error: action.payload,
                    };
        case 'UPDATE_WORKSPACE_MEMBER_SUCCESS':
            return {
                ...state,
                error: null,
            };
        case 'UPDATE_WORKSPACE_MEMBER_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'GET_TEAMINVITATION_SUCCESS':
            return {
                ...state,
                inviteDetails : action.payload,
            }
        case 'GET_TEAMINVITATION_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'POST_TEAMINVITATION_SUCCESS':
            return {
                ...state,
                inviteDetails : {},
            }
        case 'POST_TEAMINVITATION_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
        }
}

export default workspaceReducer;