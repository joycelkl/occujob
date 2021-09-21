import authAxios from '../authAxios'

export const LOAD_CHATROOM_ID_SUCCESS_ACTION = 'LOAD_CHATROOM_ID_SUCCESS';

export const loadChatroomIDSuccessAction = (chatroomID) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_CHATROOM_ID_SUCCESS_ACTION,
            payload: chatroomID
        })
    }
}

export const LOAD_CHATROOM_ID_FAIL_ACTION = 'LOAD_CHATROOM_ID_FAIL';

export const loadChatroomIDFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_CHATROOM_ID_FAIL_ACTION,
        })
    }
}


//Load chatroom Id
export const loadChatroomIDThunkAction = (chatterID, userID) => async(dispatch) => {
    console.log("Load Chatroom ID")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/chat/retrieve/chatroomid', {
            chatterID: chatterID,
            userID: userID
        }).then(res => {
            console.log('res in getting port', res)
            dispatch(loadChatroomIDSuccessAction(res.data))
        }).catch(err => {
            console.log("applicant portfolio load err res", err.response)
            dispatch(loadChatroomIDFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}