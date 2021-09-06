import authAxios from "../authAxios";

export const LOAD_APPLICANT_JOB_SUCCESS_ACTION = 'LOAD_APPLICANT_JOB_SUCCESS';

export const loadApplicantJobSuccessAction = (job) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_JOB_SUCCESS_ACTION,
            payload: job
        })
    }
}

export const LOAD_APPLICANT_JOB_FAIL_ACTION = 'LOAD_APPLICANT_JOB_FAIL';

export const loadApplicantJobFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_JOB_FAIL_ACTION
        })
    }
}

//Load Job for APPLICANT home page
export const loadApplicantJobThunkAction = () => async(dispatch) => {
    console.log("applicant Job Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/home').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadApplicantJobSuccessAction(res.data))
        }).catch(err => {
            console.log("employee job load err res", err.response)
            dispatch(loadApplicantJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}