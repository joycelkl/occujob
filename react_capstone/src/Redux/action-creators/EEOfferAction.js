import authAxios from '../authAxios'

export const LOAD_OFFER_SUCCESS_ACTION = 'LOAD_OFFER_SUCCESS';

export const loadOfferSuccessAction = (job) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_OFFER_SUCCESS_ACTION,
            payload: job
        })
    }
}

export const LOAD_OFFER_FAIL_ACTION = 'LOAD_OFFER_FAIL';

export const loadOfferFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_OFFER_FAIL_ACTION
        })
    }
}

//Load Job for employer home page
export const loadOfferThunkAction = () => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/Offer').then(res => {

            dispatch(loadOfferSuccessAction(res.data))
        }).catch(() => {

            dispatch(loadOfferFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}



export const offerAcceptAction = (application_id) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post(`/employee/offer/accept/${application_id}`).then(res => {
            dispatch(loadOfferThunkAction())
        }).catch(() => {

            dispatch(loadOfferFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


export const offerDeclineAction = (application_id) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post(`/employee/offer/decline/${application_id}`).then(res => {
            dispatch(loadOfferThunkAction())
        }).catch(() => {

            dispatch(loadOfferFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}