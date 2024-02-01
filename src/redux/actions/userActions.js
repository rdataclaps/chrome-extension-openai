export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

export const clearUser = () => ({
    type: 'CLEAR_USER',
});

export const loggedInUserIfToken = (data) => ({
    type: 'LOGGED_IN_USER_IF_TOKEN',
    payload: data
});
