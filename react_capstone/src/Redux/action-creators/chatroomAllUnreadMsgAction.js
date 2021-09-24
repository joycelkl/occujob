import authAxios from '../authAxios'

export const LOAD_ALL_UNREAD_COUNT_SUCCESS_ACTION = 'LOAD_ALL_UNREAD_COUNT_SUCCESS';

export const loadAllUnreadCountSuccessAction = (unreadMsg) => {

    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_UNREAD_COUNT_SUCCESS_ACTION,
            payload: unreadMsg
        })
    }
}

export const LOAD_ALL_UNREAD_COUNT_FAIL_ACTION = 'LOAD_ALL_UNREAD_COUNT_FAIL';

export const loadAllUnreadCountFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_UNREAD_COUNT_FAIL_ACTION,
        })
    }
}

//Load all unread Messages
export const loadAllUnreadCountThunkAction = () => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/allUnreadMsgCount`).then(res => {
            dispatch(loadAllUnreadCountSuccessAction(res.data))
        }).catch(() => {
            dispatch(loadAllUnreadCountFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}