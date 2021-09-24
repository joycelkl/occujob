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

    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.post('/chat/retrieve/chatroomid', {
            chatterID: chatterID,
            userID: userID
        }).then(res => {

            dispatch(loadChatroomIDSuccessAction(res.data))
        }).catch(err => {

            dispatch(loadChatroomIDFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}