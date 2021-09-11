import authAxios from '../authAxios'

export const LOAD_APPLICANT_SEARCH_PROFILE_SUCCESS_ACTION = 'LOAD_APPLICANT_SEARCH_PROFILE_SUCCESS';

export const loadApplicantSearchProfileSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_SEARCH_PROFILE_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_APPLICANT_SEARCH_PROFILE_FAIL_ACTION = 'LOAD_APPLICANT_SEARCH_PROFILE_FAIL';

export const loadApplicantSearchProfileFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_SEARCH_PROFILE_FAIL_ACTION
        })
    }
}

//Load Indvidual Profile in ER
export const loadApplicantSearchProfileThunkAction = (ee_id) => async(dispatch) => {
    console.log("Applicant Profile Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employer/candidateSearch/${ee_id}`).then(res => {
            dispatch(loadApplicantSearchProfileSuccessAction(res.data))
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
            dispatch(loadApplicantSearchProfileFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}