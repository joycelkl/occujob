import authAxios from '../authAxios'

export const ER_VIEW_EE_RATING_SUCCESS_ACTION = 'ER_VIEW_EE_RATING_SUCCESS';

export const erViewEeRatingSuccessAction = (rating) => {
    return (dispatch) => {
        dispatch({
            type: ER_VIEW_EE_RATING_SUCCESS_ACTION,
            payload: rating
        })
    }
}

export const ER_VIEW_EE_RATING_FAIL_ACTION = 'ER_VIEW_EE_RATING_FAIL';

export const erViewEeRatingFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: ER_VIEW_EE_RATING_FAIL_ACTION
        })
    }
}

export const erViewEeRatingThunkAction = (ee_id) => async(dispatch) => {
    console.log("erViewEeRating")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employer/companyViewApplicant/${ee_id}`).then(res => {
            dispatch(erViewEeRatingSuccessAction(res.data))
        }).catch(err => {
            console.log("Check Company Rating load err res", err.response)
            dispatch(erViewEeRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


