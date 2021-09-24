import authAxios from '../authAxios'

export const LOAD_NAVBAR_UNREAD_MSG_SUCCESS_ACTION = 'LOAD_NAVBAR_UNREAD_MSG_SUCCESS';

export const loadNavbarUnreadMsgSuccessAction = (unreadMsg) => {

    return (dispatch) => {
        dispatch({
            type: LOAD_NAVBAR_UNREAD_MSG_SUCCESS_ACTION,
            payload: unreadMsg
        })
    }
}

export const LOAD_NAVBAR_UNREAD_MSG_FAIL_ACTION = 'LOAD_NAVBAR_UNREAD_MSG_FAIL';

export const loadNavbarUnreadMsgFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_NAVBAR_UNREAD_MSG_FAIL_ACTION,
        })
    }
}

//Load unread Messages
export const loadNavbarUnreadMsgThunkAction = () => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/navbarUnreadMsg`).then(res => {

            dispatch(loadNavbarUnreadMsgSuccessAction(res.data[0].count))
        }).catch(err => {

            dispatch(loadNavbarUnreadMsgFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}