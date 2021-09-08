import { REG_LOGIN_SUCCESS_ACTION, REG_LOGIN_FAILURE_ACTION, LOGOUT_NOW_ACTION } from "../action-creators";

const initialState = {
    isAuthenticated: false || localStorage.getItem("token") != null,
    user: localStorage.getItem('type'),
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REG_LOGIN_SUCCESS_ACTION:
            return {...initialState,
                isAuthenticated: true,
                user: localStorage.getItem('type')
            };
        case REG_LOGIN_FAILURE_ACTION:
            return {...initialState,
                isAuthenticated: false,
                error: action.message
            };
        case LOGOUT_NOW_ACTION:
            return {...initialState, isAuthenticated: false, user: null };
        default:
            return state;
    }
}

export default authReducer;