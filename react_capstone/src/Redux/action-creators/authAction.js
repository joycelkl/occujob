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
        localStorage.clear('type');
        localStorage.clear('jobSearch');
        localStorage.clear('appSearch');
        localStorage.clear('applicant');
        localStorage.clear('job');
        localStorage.clear('company');
        localStorage.clear('UserName');
        localStorage.clear('userID')

        dispatch({
            type: LOGOUT_NOW_ACTION
        })
    }
}

export const ERROR_VALUE_ACTION = "ERROR_VALUE"

export const errorValueAction = () => {
    return (dispatch) => {
        dispatch({
            type: ERROR_VALUE_ACTION,

        })
    }
}


//ER User Login Thunk
export const loginERuserThunkAction = (email, password) => async(dispatch) => {

    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/login/employer`, {
                email: email,
                password: password
            }).then(res => {

                localStorage.setItem('type', 'er')
                localStorage.setItem('UserName', res.data.username)
                localStorage.setItem('userID', res.data.userID)
                localStorage.setItem("token", res.data.token);
            })
            .then(() => {
                dispatch(regLoginSuccessAction())
            })
            .catch(err => {
                dispatch(regLoginFailureAction(err.response.data))
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
        }).then(res => {

            localStorage.setItem('type', 'ee')
            localStorage.setItem('UserName', res.data.username);
            localStorage.setItem('userID', res.data.userID);
            localStorage.setItem("token", res.data.token);
            dispatch(regLoginSuccessAction())
        }).catch(err => {

            dispatch(regLoginFailureAction(err.response.data))
        })
    } catch (err) {
        console.error("Error in EE Login", err)
    }
}

//ER User Register Thunk
export const registerERuserThunkAction = (name, email, password) => async(dispatch) => {

    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/register/employer`, {
            name: name,
            email: email,
            password: password
        }).then(res => {

            localStorage.setItem('type', 'er');
            localStorage.setItem('UserName', res.data.username);
            localStorage.setItem('userID', res.data.userID);
            localStorage.setItem("token", res.data.token);
            dispatch(regLoginSuccessAction())
        }).catch(err => {
            dispatch(regLoginFailureAction(err.response.data))
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
        }).then(res => {
            localStorage.setItem('type', 'ee')
            localStorage.setItem('UserName', res.data.username);
            localStorage.setItem('userID', res.data.userID);
            localStorage.setItem("token", res.data.token);
            dispatch(regLoginSuccessAction())
        }).catch(err => {
            dispatch(regLoginFailureAction(err.response.data))
        })
    } catch (err) {
        console.error("Error in EE Register", err)
    }
}