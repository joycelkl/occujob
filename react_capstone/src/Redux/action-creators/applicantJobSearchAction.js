import authAxios from '../authAxios'

export const LOAD_SEARCH_JOB_SUCCESS_ACTION = 'LOAD_SEARCH_JOB_SUCCESS';

export const loadSearchJobSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SEARCH_JOB_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_SEARCH_JOB_FAIL_ACTION = 'LOAD_SEARCH_JOB_FAIL';

export const loadSearchJobFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SEARCH_JOB_FAIL_ACTION
        })
    }
}

export const appJobSearch = (jobTitleTag, companyName, jobFunction, jobType, worklocation, salaryType, expSalary) => async(dispatch) => {
    console.log("Applicant Search")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/search/result', {
            jobTitle: jobTitleTag,
            company: companyName,
            jobType: jobType,
            salaryType: salaryType,
            salary: expSalary,
            jobFunction: jobFunction,
            location: worklocation
        }).then(res => {
            dispatch(loadSearchJobSuccessAction(res.data))
        }).catch(err => {
            console.log("Applicant Search load err res", err.response)
            dispatch(loadSearchJobFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}