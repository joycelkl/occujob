import authAxios from '../authAxios'

export const LOAD_INDIVIDUAL_JOB_SUCCESS_ACTION = 'LOAD_INDIVIDUAL_JOB_SUCCESS';

export const loadIndJobSuccessAction = (job) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INDIVIDUAL_JOB_SUCCESS_ACTION,
            payload: job
        })
    }
}

export const LOAD_INDIVIDUAL_JOB_FAIL_ACTION = 'LOAD_INDIVIDUAL_JOB_FAIL';

export const loadIndJobFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INDIVIDUAL_JOB_FAIL_ACTION
        })
    }
}

//Load Indvidual Job Detail
export const loadIndJobThunkAction = (jobId) => async(dispatch) => {
    console.log("Indvidual Job Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employer/profile/${jobId}`).then(res => {
            dispatch(loadIndJobSuccessAction(res.data[0]))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadIndJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}