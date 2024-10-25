const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            const newState = action.payload;
            return {
                ...state,
                isAuthenticated: newState,
            }
        }
        case 'LOGOUT': {
            const newState = action.payload;
            return {
                ...state,
                isAuthenticated: newState,
                user: null,
            }
        }
        case 'CHECK_ACCOUNT': {
            const newState = action.payload;
            return {
                ...state,
                user: newState,
            }
        }
        default:
            return state;
    }
}

export default authReducer;