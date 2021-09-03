import axios from 'axios';

export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS"

export const loginSuccessAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_SUCCESS_ACTION,
        })
    }
}

export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE"

export const loginFailureAction = (message) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_FAILURE_ACTION,
            message: message,
        })
    }
}

export const LOGOUT_NOW_ACTION = "LOGOUT_NOW"

export const logoutNowAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_NOW_ACTION
        })
    }
}