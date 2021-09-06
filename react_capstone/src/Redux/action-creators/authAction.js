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
        localStorage.clear('token');
        dispatch({
            type: LOGOUT_NOW_ACTION
        })
    }
}


//ER User Login Thunk
export const loginERuserThunkAction = (email, password) => async(dispatch) => {
    console.log("ER login running")
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login/employer`, {
                email: email,
                password: password
            }).then(res => {
                console.log("ER User login success")
                localStorage.setItem("token", res.data)

            })
            .then(() => {
                dispatch(regLoginSuccessAction())
            })
            .catch(err => {
                console.log("err res", err.response)

                dispatch(regLoginFailureAction(err.response.data))
            })
    } catch (err) {
        console.error("Error in ER Login", err)
    }
}

//Applicant User Login Thunk
export const loginEEuserThunkAction = (email, password) => async(dispatch) => {
    console.log("Application Login running")
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login/employee`, {
            email: email,
            password: password
        }).then(res => {
            console.log("EE User login success")
            localStorage.setItem("token", res.data);
            dispatch(regLoginSuccessAction())
        }).catch(err => {
            console.log("err res", err.response)
            dispatch(regLoginFailureAction(err.response.data))
        })
    } catch (err) {
        console.error("Error in EE Login", err)
    }
}

//ER User Register Thunk
export const registerERuserThunkAction = (name, email, password) => async(dispatch) => {
    console.log('register ER running')
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/register/employer`, {
            name: name,
            email: email,
            password: password
        }).then(res => {
            console.log("ER User login success")
            localStorage.setItem("token", res.data);
            dispatch(regLoginSuccessAction())
        }).catch(err => {
            console.log("err res", err.response)
            dispatch(regLoginFailureAction(err.response.data))
        })
    } catch (err) {
        console.error("Error in ER Register", err)
    }
}

//Applicant User Register Thunk
export const registerEEuserThunkAction = (name, email, password) => async(dispatch) => {
    console.log('Application register running')
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/register/employee`, {
            name: name,
            email: email,
            password: password
        }).then(res => {
            console.log("ER User login success")
            localStorage.setItem("token", res.data);
            dispatch(regLoginSuccessAction())
        }).catch(err => {
            console.log("err res", err.response)
            dispatch(regLoginFailureAction(err.response.data))
        })
    } catch (err) {
        console.error("Error in EE Register", err)
    }
}