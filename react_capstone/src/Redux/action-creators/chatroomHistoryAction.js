import authAxios from '../authAxios'

export const LOAD_CHATROOM_HISTORY_SUCCESS_ACTION = 'LOAD_CHATROOM_HISTORY_SUCCESS';

export const loadChatroomHistorySuccessAction = (chatHistory) => {
    console.log("CHECKING CHAT HISTORY", chatHistory)
    return (dispatch) => {
        dispatch({
            type: LOAD_CHATROOM_HISTORY_SUCCESS_ACTION,
            payload: chatHistory
        })
    }
}

export const LOAD_CHATROOM_HISTORY_FAIL_ACTION = 'LOAD_CHATROOM_HISTORY_FAIL';

export const loadChatroomHistoryFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_CHATROOM_HISTORY_FAIL_ACTION,
        })
    }
}

//Load Chatroom History
export const loadChatroomHistoryThunkAction = (chatroomID) => async(dispatch) => {
    console.log("Chatroom History Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/retrieve/chatroomHistory/${chatroomID}`).then(res => {
            console.log('moving ninto dis')
            dispatch(loadChatroomHistorySuccessAction(res.data))
        }).catch(err => {
            console.log("chatroom history load err res", err.response)
            dispatch(loadChatroomHistoryFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}

export const ADD_CHATROOM_HISTORY_SUCCESS_ACTION = 'ADD_CHATROOM_ID_SUCCESS';

export const addChatroomHistorySuccessAction = (chatMsg) => {
    return (dispatch) => {
        dispatch({
            type: ADD_CHATROOM_HISTORY_SUCCESS_ACTION,
            payload: chatMsg
        })
    }
}

export const sendChatroomMessageThunkAction = (chatroomID, senderType, user_id, message) => async(dispatch) => {
    console.log("sending Message", chatroomID, senderType, user_id, message)
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post(`chat/sendMessage`, {
            chatroomID: chatroomID,
            senderType: senderType,
            user_id: user_id,
            message: message
        }).then(res => {
            console.log('res in send msg load', res.data)
                // dispatch(addChatroomHistorySuccessAction(res.data))
        }).catch(err => {
            console.log("send msg load err res", err.response)
            dispatch(loadChatroomHistoryFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}