import { LOGIN_SUCCESS_ACTION, LOGIN_FAILURE_ACTION, LOGOUT_NOW_ACTION } from "../action-creators";

const initialState = {
    isAuthenticated: false || localStorage.getItem("token") != null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS_ACTION:
            return { isAuthenticated: true };
        case LOGIN_FAILURE_ACTION:
            return state;
        case LOGOUT_NOW_ACTION:
            return { isAuthenticated: false };
        default:
            return state;
    }
}

export default authReducer;