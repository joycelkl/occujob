import authAxios from '../authAxios'

export const EE_VIEW_ER_RATING_SUCCESS_ACTION = 'EE_VIEW_ER_RATING_SUCCESS';

export const eeViewErRatingSuccessAction = (rating) => {
    return (dispatch) => {
        dispatch({
            type: EE_VIEW_ER_RATING_SUCCESS_ACTION,
            payload: rating
        })
    }
}

export const EE_VIEW_ER_RATING_FAIL_ACTION = 'EE_VIEW_ER_RATING_FAIL';

export const eeViewErRatingFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: EE_VIEW_ER_RATING_FAIL_ACTION
        })
    }
}

export const eeViewErRatingThunkAction = (er_id) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`/employee/applicantViewCompany/${er_id}`).then(res => {
            dispatch(eeViewErRatingSuccessAction(res.data))
        }).catch(() => {
            dispatch(eeViewErRatingFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}