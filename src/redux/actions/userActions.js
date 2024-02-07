export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});
export const setNewRegistraion = (payload) => ({
    type: 'SET_NEW_REGISTRATION',
    payload: payload,
});

export const clearUser = () => ({
    type: 'CLEAR_USER',
});

export const loggedInUserIfToken = (data) => ({
    type: 'LOGGED_IN_USER_IF_TOKEN',
    payload: data
});
export const openEmailBox = (data) => ({
    type: 'SHOW_EMAIL_POP_UP',
    payload: data
});
