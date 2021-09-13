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
    console.log("Offer Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/Offer').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadOfferSuccessAction(res.data))
        }).catch(err => {
            console.log("Offer load err res", err.response)
            dispatch(loadOfferFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}



export const offerAcceptAction = (application_id) => async(dispatch) => {
    console.log("EE offer Accept")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post(`/employee/offer/accept/${application_id}`).then(res => {
            dispatch(loadOfferThunkAction())
        }).catch(err => {
            console.log("Update fail err res", err.response)
            dispatch(loadOfferFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


export const offerDeclineAction = (application_id) => async(dispatch) => {
    console.log("EE offer Decline")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post(`/employee/offer/decline/${application_id}`).then(res => {
            dispatch(loadOfferThunkAction())
        }).catch(err => {
            console.log("Update fail err res", err.response)
            dispatch(loadOfferFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}