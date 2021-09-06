import authAxios from '../authAxios'

export const LOAD_EMPLOYER_JOB_SUCCESS_ACTION = 'LOAD_EMPLOYER_JOB_SUCCESS';

export const loadEmployerJobSuccessAction = (job) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EMPLOYER_JOB_SUCCESS_ACTION,
            payload: job
        })
    }
}

export const LOAD_EMPLOYER_JOB_FAIL_ACTION = 'LOAD_EMPLOYER_JOB_FAIL';

export const loadEmployerJobFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EMPLOYER_JOB_FAIL_ACTION
        })
    }
}

//Load Job for employer home page
export const loadEmployerJobThunkAction = () => async(dispatch) => {
    console.log("employer Job Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/home').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadEmployerJobSuccessAction(res.data))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadEmployerJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}