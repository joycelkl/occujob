import axios from 'axios';

export const REG_LOGIN_SUCCESS_ACTION = "REG_LOGIN_SUCCESS"

export const regLoginSuccessAction = () => {
    return (dispatch) => {
        dispatch({
            type: REG_LOGIN_SUCCESS_ACTION,
        })
    }
}

export const REG_LOGIN_FAILURE_ACTION = "REG_LOGIN_FAILURE"

export const regLoginFailureAction = (message) => {
    return (dispatch) => {
        dispatch({
            type: REG_LOGIN_FAILURE_ACTION,
            message: message
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
export const loginERuserThunkAction = (email, password) => async(dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login/employer`, {
            email: email,
            password: password
        }).then((res) => {
            console.log("res in loginERthunk", res)
            if (res.data == null || !res.data.token) {
                dispatch(regLoginFailureAction("Invalid Credential"))
            } else {
                console.log("ER User login success")
                localStorage.setItem("token", res.data.token);
                dispatch(regLoginSuccessAction())
            }
        })
    } catch (err) {
        console.error("Error in ER Login", err)
    }
}

//Applicant User Login Thunk
export const loginEEuserThunkAction = (email, password) => async(dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login/employee`, {
            email: email,
            password: password
        }).then((res) => {
            console.log("res in loginEEthunk", res)
            if (res.data == null || !res.data.token) {
                dispatch(regLoginFailureAction("Invalid Credential"))
                return false
            } else {
                console.log("EE User login success")
                localStorage.setItem("token", res.data.token);
                dispatch(regLoginSuccessAction())
                return true
            }
        })
    } catch (err) {
        console.error("Error in ER Login", err)
    }
}

//ER User Register Thunk
export const registerERuserThunkAction = (name, email, password) => async(dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/register/employer`, {
            name: name,
            email: email,
            password: password
        }).then((res) => {
            console.log("res in registerERthunk", res)
            if (res.data == null || !res.data.token) {
                dispatch(regLoginFailureAction("Invalid Credential"))
            } else {
                console.log("ER User register success")
                localStorage.setItem("token", res.data.token);
                dispatch(regLoginSuccessAction())
            }
        })
    } catch (err) {
        console.error("Error in ER Register", err)
    }
}

//Applicant User Register Thunk
export const registerEEuserThunkAction = (name, email, password) => async(dispatch) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/register/employee`, {
            name: name,
            email: email,
            password: password
        }).then((res) => {
            console.log("res in registerEEthunk", res)
            if (res.data == null || !res.data.token) {
                dispatch(regLoginFailureAction("Invalid Credential"))
            } else {
                console.log("EE User register success")
                localStorage.setItem("token", res.data.token);
                dispatch(regLoginSuccessAction())
            }
        })
    } catch (err) {
        console.error("Error in EE Register", err)
    }
}