import authAxios from '../authAxios'

//for home page
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

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/home').then(res => {

            dispatch(loadEmployerJobSuccessAction(res.data))
        }).catch(err => {

            dispatch(loadEmployerJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


// getting job posting history
export const erJobRecordAction = () => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/job/list').then(res => {
            dispatch(loadEmployerJobSuccessAction(res.data))
        }).catch(err => {

            dispatch(loadEmployerJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

//Update Job for Employer Job Records Page

export const erJobUpdate = (job_id, jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, status, location, empType, salaryType) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post(`/employer/job/${job_id}`, {
            jobTitle: jobTitle,
            jobFunction: jobFunction,
            reqExp: reqExp,
            expectSalary: expectSalary,
            jobDescription: jobDescription,
            workPeriod: workPeriod,
            status: status,
            location: location,
            empType: empType,
            salaryType: salaryType,
        }).then(res => {
            dispatch(loadEmployerJobSuccessAction(res.data))
        }).catch(err => {

            dispatch(loadEmployerJobFailAction)
        })
    } catch (err) {
        console.error(err)
    }
}