import { REG_LOGIN_SUCCESS_ACTION, REG_LOGIN_FAILURE_ACTION, LOGOUT_NOW_ACTION } from "../action-creators";

const initialState = {
    isAuthenticated: false || localStorage.getItem("token") != null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REG_LOGIN_SUCCESS_ACTION:
            return {...initialState, isAuthenticated: true };
        case REG_LOGIN_FAILURE_ACTION:
            return {
                isAuthenticated: false,
                error: action.message
            };
        case LOGOUT_NOW_ACTION:
            return {...initialState, isAuthenticated: false };
        default:
            return state;
    }
}

export default authReducer;