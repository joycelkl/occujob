import authAxios from '../authAxios'

export const LOAD_SEARCH_APPLICANT_SUCCESS_ACTION = 'LOAD_ER_PROFILE_SUCCESS';

export const loadSearchCandidateSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SEARCH_APPLICANT_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_SEARCH_APPLICANT_FAIL_ACTION = 'LOAD_ER_PROFILE_FAIL';

export const loadSearchCandidateFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SEARCH_APPLICANT_FAIL_ACTION
        })
    }
}

export const erAppSearch = (available, jobFunction, expSalary, location, skills, salaryType, workExp) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employer/candidateSearch', {
            available: available,
            jobFunction: jobFunction,
            expSalary: expSalary,
            location: location,
            salaryType: salaryType,
            skills: skills,
            workExp: workExp
        }).then(res => {
            dispatch(loadSearchCandidateSuccessAction(res.data))
        }).catch(() => {

            dispatch(loadSearchCandidateFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}