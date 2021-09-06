import authAxios from '../authAxios'

export const LOAD_ER_PROFILE_SUCCESS_ACTION = 'LOAD_ER_PROFILE_SUCCESS';

export const loadErProfileSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ER_PROFILE_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_ER_PROFILE_FAIL_ACTION = 'LOAD_ER_PROFILE_FAIL';

export const loadErProfileFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ER_PROFILE_FAIL_ACTION
        })
    }
}

//Load Job for ER Profile
export const loadErProfileThunkAction = () => async(dispatch) => {
    console.log("ER Profile Load")
    try {
        const authAxiosinfo = await authAxios();
        await authAxiosinfo.get('/employer/profile').then(res => {
            dispatch(loadErProfileSuccessAction(res.data))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadErProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}