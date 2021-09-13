import authAxios from '../authAxios'

export const LOAD_APP_PORTFOLIO_SUCCESS_ACTION = 'LOAD_APP_PORTFOLIO_SUCCESS';

export const loadAppPortfolioSuccessAction = (profile) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APP_PORTFOLIO_SUCCESS_ACTION,
            payload: profile
        })
    }
}

export const LOAD_APP_PORTFOLIO_FAIL_ACTION = 'LOAD_APP_PORTFOLIO_FAIL';

export const loadAppPortfolioFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APP_PORTFOLIO_FAIL_ACTION
        })
    }
}

//Load Applicant Portfolio
export const loadAppPortfolioThunkAction = () => async(dispatch) => {
    console.log("Applicant Profile Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/portfolio').then(res => {
            dispatch(loadAppPortfolioSuccessAction(res.data))
        }).catch(err => {
            console.log("applicant portfolio load err res", err.response)
            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

//add portfolio
export const addAppPortfolioThunkAction = (pName, pDes, purl) => async(dispatch) => {
    console.log("ER Profile Load", pName, pDes, purl)
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/portfolio/add', {
            pName: pName,
            pDes: pDes,
            purl: purl
        }).then(res => {
            dispatch(loadAppPortfolioSuccessAction(res.data))
        }).catch(err => {
            console.log("applicant portfolio add err res", err.response)
            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


//update portfolio
export const updateAppPortfolioThunkAction = (p_id, pName, pDes, purl) => async(dispatch) => {
    console.log("ER Profile Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/portfolio/update', {
            p_id: p_id,
            pName: pName,
            pDes: pDes,
            purl: purl
        }).then(res => {
            dispatch(loadAppPortfolioSuccessAction(res.data))
        }).catch(err => {
            console.log("applicant portfolio update err res", err.response)
            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

//delete portfolio
export const deleteAppPortfolioThunkAction = (p_id) => async(dispatch) => {
    console.log("ER Profile Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/portfolio/delete', {
            p_id: p_id
        }).then(res => {
            dispatch(loadAppPortfolioSuccessAction(res.data))
        }).catch(err => {
            console.log("applicant portfolio delete err res", err.response)
            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}