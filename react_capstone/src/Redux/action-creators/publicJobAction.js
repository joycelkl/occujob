import axios from 'axios';

export const LOAD_PUBLIC_JOB_SUCCESS_ACTION = 'LOAD_PUBLIC_JOB_SUCCESS';

export const loadPublicJobSuccessAction = (job) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_PUBLIC_JOB_SUCCESS_ACTION,
            payload: job
        })
    }
}

export const LOAD_PUBLIC_JOB_FAIL_ACTION = 'LOAD_PUBLIC_JOB_FAIL';

export const loadPublicJobFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_PUBLIC_JOB_FAIL_ACTION
        })
    }
}

//Load Job for public page
export const loadPublicJobThunkAction = () => async(dispatch) => {
    console.log("public Job Load")
    try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/public/job`).then(res => {
            dispatch(loadPublicJobSuccessAction(res.data))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadPublicJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}