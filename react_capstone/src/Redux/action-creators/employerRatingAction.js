import authAxios from '../authAxios'

export const LOAD_EMPLOYER_RATING_SUCCESS_ACTION = 'LOAD_EMPLOYER_RATING_SUCCESS';

export const loadEmployerRatingSuccessAction = (rating) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EMPLOYER_RATING_SUCCESS_ACTION,
            payload: rating
        })
    }
}

export const LOAD_EMPLOYER_RATING_FAIL_ACTION = 'LOAD_APPLICANT_RATING_FAIL';

export const loadEmployerRatingFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EMPLOYER_RATING_FAIL_ACTION
        })
    }
}

export const employerGetRatingThunkAction = () => async(dispatch) => {
    console.log("employer Rating")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/companyRatingView').then(res => {
            dispatch(loadEmployerRatingSuccessAction(res.data))
        }).catch(err => {
            console.log("Employer Rating load err res", err.response)
            dispatch(loadEmployerRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}