import authAxios from '../authAxios'

//for home page
export const LOAD_SEARCH_ITEM_SUCCESS_ACTION = 'LOAD_SEARCH_ITEM_SUCCESS';

export const loadSearchItemSuccessAction = (searchJob) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SEARCH_ITEM_SUCCESS_ACTION,
            payload: searchJob
        })
    }
}

export const LOAD_SEARCH_ITEM_FAIL_ACTION = 'LOAD_SEARCH_ITEM_FAIL';

export const loadSearchItemFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SEARCH_ITEM_FAIL_ACTION
        })
    }
}

