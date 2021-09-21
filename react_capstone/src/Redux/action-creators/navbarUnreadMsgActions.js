import authAxios from '../authAxios'

export const LOAD_NAVBAR_UNREAD_MSG_SUCCESS_ACTION = 'LOAD_NAVBAR_UNREAD_MSG_SUCCESS';

export const loadNavbarUnreadMsgSuccessAction = (unreadMsg) => {
    console.log("CHECKING UNREAD MESSAGE COUNT", unreadMsg)
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
    console.log("Narbar UnreadMsg count Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/navbarUnreadMsg`).then(res => {
            console.log('unreadMsgs res.data', res.data[0].count)
            dispatch(loadNavbarUnreadMsgSuccessAction(res.data[0].count))
        }).catch(err => {
            console.log("chatroom history load err res", err.response)
            dispatch(loadNavbarUnreadMsgFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}