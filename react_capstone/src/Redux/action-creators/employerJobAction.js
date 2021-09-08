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








export const erJobRecordAction = () => async(dispatch) => {
    console.log("ER Job Posting")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/job/list').then(res => {
            dispatch(loadEmployerJobSuccessAction(res.data))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadEmployerJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

//Update Job for Employer Job Records Page

export const erJobUpdate = (job_id, jobTitle, jobFunction, reqExp, expectSalary, jobDescription, workPeriod, status, location, empType) => async(dispatch) => {
    console.log("ER JOB UPDATE")
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
            empType: empType
        }).then(res => {
            dispatch(loadEmployerJobSuccessAction(res.data))
        }).catch(err => {
            console.log('update job err', err.response)
            dispatch(loadEmployerJobFailAction)
        })
    } catch (err) {
        console.error(err)
    }
}