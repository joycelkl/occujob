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

//Load Indvidual Job Detail in ER (not to reuse)
export const loadIndJobThunkAction = (jobId) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employer/job/${jobId}`).then(res => {
            dispatch(loadIndJobSuccessAction(res.data))
        }).catch(err => {

            dispatch(loadIndJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

//Load Indvidual Job Detail in Job Search 
export const loadSearchIndJobThunkAction = (jobId) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employee/search/results/${jobId}`).then(res => {
            dispatch(loadIndJobSuccessAction(res.data))
        }).catch(err => {

            dispatch(loadIndJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}