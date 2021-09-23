import authAxios from '../authAxios'

export const LOAD_UNREAD_MSG_SUCCESS_ACTION = 'LOAD_UNREAD_MSG_SUCCESS';

export const loadUnreadMsgSuccessAction = (unreadMsg) => {

    return (dispatch) => {
        dispatch({
            type: LOAD_UNREAD_MSG_SUCCESS_ACTION,
            payload: unreadMsg
        })
    }
}

export const LOAD_UNREAD_MSG_FAIL_ACTION = 'LOAD_UNREAD_MSG_FAIL';

export const loadUnreadMsgFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_UNREAD_MSG_FAIL_ACTION,
        })
    }
}

//Load unread Messages
export const loadUnreadMsgThunkAction = (chatroomID) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/getUnreadMsg/${chatroomID}`).then(res => {
            dispatch(loadUnreadMsgSuccessAction(res.data[0].count))
        }).catch(() => {
            dispatch(loadUnreadMsgFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


export const RESET_UNREAD_MSG_SUCCESS_ACTION = 'RESET_UNREAD_MSG_SUCCESS';

export const resetUnreadMsgSuccessAction = (unreadMsg) => {

    return (dispatch) => {
        dispatch({
            type: RESET_UNREAD_MSG_SUCCESS_ACTION,
            payload: unreadMsg
        })
    }
}

//update unread Messages
export const resetUnreadMsgThunkAction = (chatroomID) => async(dispatch) => {

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.put(`chat/resetUnreadMsg/${chatroomID}`).then(res => {

            dispatch(resetUnreadMsgSuccessAction(res.data))
        }).catch(() => {

            dispatch(loadUnreadMsgFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}