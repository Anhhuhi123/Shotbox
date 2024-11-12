const initialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
    roleId: 2,
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
                roleId: 2,
            }
        }
        case 'CHECK_ACCOUNT': {
            const newState = action.payload;
            return {
                ...state,
                roleId: newState,
            }
        }
        default:
            return state;
    }
}

export default authReducer;