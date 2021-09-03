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



//ER User Login Thunk
export const loginERuserThunk = (email, password) => async(dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login/employer`, {
            email: email,
            password: password
        }).then((res) => {
            console.log("res in loginERthunk", res)
            if (res.data == null || !res.data.token) {
                dispatch(loginFailureAction('Invalid Credential'))
            } else {
                console.log("ER User login success")
                localStorage.setItem("token", res.data.token);
                dispatch(loginSuccessAction())
            }
        })
    } catch (err) {
        console.error("Error in ER Login", err)
    }
}