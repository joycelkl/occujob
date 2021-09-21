import authAxios from '../authAxios'

export const LOAD_UNREAD_MSG_SUCCESS_ACTION = 'LOAD_UNREAD_MSG_SUCCESS';

export const loadUnreadMsgSuccessAction = (unreadMsg) => {
    console.log("CHECKING UNREAD MESSAGE COUNT", unreadMsg)
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
    console.log("UnreadMsg count Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/getUnreadMsg/${chatroomID}`).then(res => {
            console.log('unreadMsgs res.data', res.data[0].count)
            dispatch(loadUnreadMsgSuccessAction(res.data[0].count))
        }).catch(err => {
            console.log("chatroom history load err res", err.response)
            dispatch(loadUnreadMsgFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}


export const RESET_UNREAD_MSG_SUCCESS_ACTION = 'RESET_UNREAD_MSG_SUCCESS';

export const resetUnreadMsgSuccessAction = (unreadMsg) => {
    console.log("RESET UNREAD MSG COUNT", unreadMsg)
    return (dispatch) => {
        dispatch({
            type: RESET_UNREAD_MSG_SUCCESS_ACTION,
            payload: unreadMsg
        })
    }
}

//update unread Messages
export const resetUnreadMsgThunkAction = (chatroomID) => async(dispatch) => {
    console.log("UnreadMsg count Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.put(`chat/resetUnreadMsg/${chatroomID}`).then(res => {
            console.log('unreadMsgs res.data', res.data)
            dispatch(resetUnreadMsgSuccessAction(res.data))
        }).catch(err => {
            console.log("chatroom history load err res", err.response)
            dispatch(loadUnreadMsgFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}