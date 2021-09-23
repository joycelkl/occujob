import authAxios from '../authAxios'

export const LOAD_APP_PORTFOLIO_SUCCESS_ACTION = 'LOAD_APP_PORTFOLIO_SUCCESS';

export const loadAppPortfolioSuccessAction = (portfolio) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_APP_PORTFOLIO_SUCCESS_ACTION,
            payload: portfolio
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

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get('/employee/portfolio').then(res => {

            dispatch(loadAppPortfolioSuccessAction(res.data))
        }).catch(() => {

            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

export const ADD_APP_PORTFOLIO_SUCCESS_ACTION = 'ADD_APP_PORTFOLIO_SUCCESS';

export const addAppPortfolioSuccessAction = (portfolio) => {
    return (dispatch) => {
        dispatch({
            type: ADD_APP_PORTFOLIO_SUCCESS_ACTION,
            payload: portfolio
        })
    }
}

//add portfolio
export const addAppPortfolioThunkAction = (pName, pDes, purl) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/portfolio/add', {
            pName: pName,
            pDes: pDes,
            purl: purl
        }).then(res => {

            dispatch(addAppPortfolioSuccessAction(res.data))
        }).catch(() => {

            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


//update portfolio
export const updateAppPortfolioThunkAction = (p_id, pName, pDes, purl) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/portfolio/update', {
            p_id: p_id,
            pName: pName,
            pDes: pDes,
            purl: purl
        }).then(res => {
            dispatch(loadAppPortfolioSuccessAction(res.data))
        }).catch(() => {

            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

export const DELETE_APP_PORTFOLIO_SUCCESS_ACTION = 'DELETE_APP_PORTFOLIO_SUCCESS';

export const deleteAppPortfolioSuccessAction = (portfolio) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_APP_PORTFOLIO_SUCCESS_ACTION,
            payload: portfolio
        })
    }
}

//delete portfolio
export const deleteAppPortfolioThunkAction = (p_id) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/employee/portfolio/delete', {
            p_id: p_id
        }).then(res => {
            dispatch(deleteAppPortfolioSuccessAction(res.data))
        }).catch(() => {
            dispatch(loadAppPortfolioFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}