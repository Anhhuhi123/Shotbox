export const authLogin = (res) => {
    localStorage.setItem('authToken', res.token);
    return {
        type: 'LOGIN_SUCCESS',
        payload: true
    }
}

export const authLogout = () => {
    localStorage.removeItem('authToken');
    return {
        type: 'LOGOUT',
        payload: false
    }
}

export const authAccount = (data) => {
    return {
        type: 'CHECK_ACCOUNT',
        payload: data,
    }
}