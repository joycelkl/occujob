import authAxios from '../authAxios'

export const LOAD_APPLICANT_CREATED_RATING_SUCCESS_ACTION = 'LOAD_APPLICANT_CREATED_RATING_SUCCESS';

export const loadApplicantCreatedRatingSuccessAction = (rating) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_CREATED_RATING_SUCCESS_ACTION,
            payload: rating
        })
    }
}

export const LOAD_APPLICANT_CREATED_RATING_FAIL_ACTION = 'LOAD_APPLICANT_CREATED_RATING_FAIL';

export const loadApplicantCreatedRatingFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APPLICANT_CREATED_RATING_FAIL_ACTION
        })
    }
}

export const applicantCreatedRatingThunkAction = () => async(dispatch) => {
    console.log("Applicant Rating")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/applicantCreatedRating').then(res => {
            dispatch(loadApplicantCreatedRatingSuccessAction(res.data))
        }).catch(err => {
            console.log("Applicant Rating load err res", err.response)
            dispatch(loadApplicantCreatedRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


