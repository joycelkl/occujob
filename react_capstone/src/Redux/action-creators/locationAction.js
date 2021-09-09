import authAxios from '../authAxios'

export const LOAD_LOCATION_SUCCESS_ACTION = 'LOAD_LOCATION_SUCCESS';

export const loadLocationSuccessAction = (location) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_LOCATION_SUCCESS_ACTION,
            payload: location
        })
    }
}

export const LOAD_LOCATION_FAIL_ACTION = 'LOAD_LOCATION_FAIL';

export const loadLocationFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_LOCATION_FAIL_ACTION
        })
    }
}
export const loadLocationThunkAction = () => async(dispatch) => {
    console.log("Location Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/public/location').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadLocationSuccessAction(res.data))
        }).catch(err => {
            console.log("Location load err res", err.response)
            dispatch(loadLocationFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}
