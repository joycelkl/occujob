import authAxios from '../authAxios'

export const LOAD_INDUSTRY_SUCCESS_ACTION = 'LOAD_INDUSTRY_SUCCESS';

export const loadIndustrySuccessAction = (industry) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INDUSTRY_SUCCESS_ACTION,
            payload: industry
        })
    }
}

export const LOAD_INDUSTRY_FAIL_ACTION = 'LOAD_INDUSTRY_FAIL';

export const loadIndustryFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_INDUSTRY_FAIL_ACTION
        })
    }
}
export const loadIndustryThunkAction = () => async(dispatch) => {
    console.log("Industry Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/public/industry').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadIndustrySuccessAction(res.data))
        }).catch(err => {
            console.log("Skills load err res", err.response)
            dispatch(loadIndustryFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}
