import authAxios from '../authAxios'

//for home page
export const LOAD_COMPANY_NAME_SUCCESS_ACTION = 'LOAD_COMPANY_NAME_SUCCESS';

export const loadCompanyNameSuccessAction = (companyName) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMPANY_NAME_SUCCESS_ACTION,
            payload: companyName
        })
    }
}

export const LOAD_COMPANY_NAME_FAIL_ACTION = 'LOAD_COMPANY_NAME_FAIL';

export const loadCompanyNameFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_COMPANY_NAME_FAIL_ACTION
        })
    }
}
export const loadCompanyNameThunkAction = () => async(dispatch) => {
    console.log("Company Name Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/public/company').then(res => {
            console.log("RES DATA", res.data)
            dispatch(loadCompanyNameSuccessAction(res.data))
        }).catch(err => {
            console.log("Company Name load err res", err.response)
            dispatch(loadCompanyNameFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}
