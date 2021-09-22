import authAxios from '../authAxios'

export const LOAD_EMPLOYER_CREATED_RATING_SUCCESS_ACTION = 'LOAD_EMPLOYER_CREATED_RATING_SUCCESS';

export const loadEmployerCreatedRatingSuccessAction = (rating) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EMPLOYER_CREATED_RATING_SUCCESS_ACTION,
            payload: rating
        })
    }
}

export const LOAD_EMPLOYER_CREATED_RATING_FAIL_ACTION = 'LOAD_EMPLOYER_CREATED_RATING_FAIL';

export const loadEmployerCreatedRatingFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_EMPLOYER_CREATED_RATING_FAIL_ACTION
        })
    }
}

export const employerCreatedRatingThunkAction = () => async(dispatch) => {
    console.log("Applicant Rating")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employer/companyCreatedRating').then(res => {
            dispatch(loadEmployerCreatedRatingSuccessAction(res.data))
        }).catch(err => {
            console.log("Company Rating load err res", err.response)
            dispatch(loadEmployerCreatedRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

export const employerUpdateRating = (ee_id, application_id, rating, comments) => async(dispatch) => {
    console.log("employer Rating")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employer/companyGiveRating', {
            ee_id: ee_id,
            application_id: application_id,
            rate: rating,
            comment: comments,
        }).then(res => {
            dispatch(loadEmployerCreatedRatingSuccessAction(res.data))
        }).catch(err => {
            console.log("Employer Rating load err res", err.response)
            dispatch(loadEmployerCreatedRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}