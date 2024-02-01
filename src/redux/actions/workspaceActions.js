import authAxios from "../../services/authAxios";
import Cookies from "js-cookie";
import { getUser } from "./authActions";
import { toast } from "react-toastify";


export const getWorkspaceTeam = (data) => async (dispatch) => {
    try {
        const role = JSON.parse(Cookies.get('role'));
        const payload = { display_name: data };
        const response = await authAxios.get(`teams/${role?.team?.id}`, payload);
        dispatch({ type: 'GET_WORKSPACETEAM_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_WORKSPACETEAM_ERROR', payload: error.message });
    }
}


export const addWorkspace = (data) => async (dispatch) => {
    try {
        const response = await authAxios.post(`teams`, data);
        dispatch({ type: 'ADD_WORKSPACE_SUCCESS', payload: response.data });
        dispatch(getUser());
        toast.success("workspace has been created", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
    } catch (error) {
        toast.info(error?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
        dispatch({ type: 'ADD_WORKSPACE_ERROR', payload: error.message });
    }
}

export const updateWorkspace = (data) => async (dispatch) => {
    try {
        const role = JSON.parse(Cookies.get('role'));
        const response = await authAxios.put(`teams/${role?.team?.id}`, data);
        dispatch({ type: 'UPDATE_WORKSPACE_SUCCESS', payload: response.data });
        dispatch(getUser());
        toast.success("Updated name and description", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
    } catch (error) {
        toast.info("Not updated", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
        dispatch({ type: 'UPDATE_WORKSPACE_ERROR', payload: error.message });
    }
}

export const inviteWorkspace = (data) => async (dispatch) => {
    try {
        //const role = JSON.parse(Cookies.get('role'));
        const response = await authAxios.post(`invite-user`, data);
        toast.success('User is invited', {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
        dispatch({ type: 'INVITE_WORKSPACE_SUCCESS', payload: response.data });
        dispatch(getTeamMembers());
    } catch (error) {
        toast.info(error?.response?.data?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
        dispatch({ type: 'INVITE_WORKSPACE_ERROR', payload: error.message });
    }
}

export const getTeamMembers = (data) => async (dispatch) => {
    try {
        //const role = JSON.parse(Cookies.get('role'));
        // if (role?.team) {
        dispatch({ type: 'START_FETCHING_WORKSPACE_MEMBERS' });
        const response = await authAxios.get(`team-members`, data);
        dispatch({ type: 'TEAM_WORKSPACE_MEMBER_SUCCESS', payload: response.data });
        // }
    } catch (error) {
        dispatch({ type: 'TEAM_WORKSPACE_MEMBER_ERROR', payload: error.message });
    }
}

export const deleteWorkspaceMember = (data) => async (dispatch) => {
    try {
        //const role = JSON.parse(Cookies.get('role'));
        const response = await authAxios.post(`remove-user`, data);
        dispatch({ type: 'DELETE_WORKSPACE_MEMBER_SUCCESS', payload: response.data });
        dispatch(getTeamMembers());
    } catch (error) {
        dispatch({ type: 'DELETE_WORKSPACE_MEMBER_ERROR', payload: error.message });
    }
}

export const updateWorkspaceMember = (data) => async (dispatch) => {
    try {
        //const role = JSON.parse(Cookies.get('role'));
        const response = await authAxios.put(`edit-user`, data);
        dispatch({ type: 'UPDATE_WORKSPACE_MEMBER_SUCCESS', payload: response.data });
        dispatch(getTeamMembers());
    } catch (error) {
        dispatch({ type: 'UPDATE_WORKSPACE_MEMBER_ERROR', payload: error.message });
    }
}

export const getTeamInvitation = () => async (dispatch) => {
    try {
        const response = await authAxios.get(`invitation-notifications`);
        dispatch({ type: 'GET_TEAMINVITATION_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_TEAMINVITATION_ERROR', payload: error.message });
    }
}

export const postTeamInvitation = (data) => async (dispatch) => {
    try {
        const response = await authAxios.post(`team-invitation-action`, data);
        dispatch({ type: 'POST_TEAMINVITATION_SUCCESS', payload: response.data });
        dispatch(getUser());
        toast.success("Joined Successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
    } catch (error) {
        dispatch({ type: 'POST_TEAMINVITATION_ERROR', payload: error.message });
        toast.info("Unsuccessful Attempt!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
            autoClose: 2000
        })
    }
}