import axios from 'axios';
export const LOAD_EE_PROFILE_SUCCESS_ACTION = 'LOAD_EE_PROFILE_SUCCESS';

export const loadEEProfileSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EE_PROFILE_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_EE_PROFILE_FAIL_ACTION = 'LOAD_EE_PROFILE_FAIL';

export const loadEEProfileFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EE_PROFILE_FAIL_ACTION
        })
    }
}

//Load Profile for EE page
export const loadEEProfileThunkAction = () => async(dispatch) => {
    console.log("public Profile Loaded")
    try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/profile`).then(res => {
            dispatch(loadEEProfileSuccessAction(res.data))
        }).catch(err => {
            console.log("EE Profile load err res", err.response)
            dispatch(loadEEProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}