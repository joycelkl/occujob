import authAxios from '../authAxios'

export const LOAD_APPLICANT_RATING_SUCCESS_ACTION = 'LOAD_APPLICANT_RATING_SUCCESS';

export const loadApplicantRatingSuccessAction = (rating) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_RATING_SUCCESS_ACTION,
            payload: rating
        })
    }
}

export const LOAD_APPLICANT_RATING_FAIL_ACTION = 'LOAD_APPLICANT_RATING_FAIL';

export const loadApplicantRatingFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_RATING_FAIL_ACTION
        })
    }
}

export const applicantGetRatingThunkAction = () => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/applicantRatingView').then(res => {
            dispatch(loadApplicantRatingSuccessAction(res.data))
        }).catch(() => {
            dispatch(loadApplicantRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}