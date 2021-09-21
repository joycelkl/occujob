import authAxios from '../authAxios'

export const LOAD_ALL_CHATROOMS_SUCCESS_ACTION = 'LOAD_ALL_CHATROOMS_SUCCESS';

export const loadAllChatroomsSuccessAction = (allChats) => {
    console.log("CHECKING CHAT HISTORY", allChats)
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_CHATROOMS_SUCCESS_ACTION,
            payload: allChats
        })
    }
}

export const LOAD_ALL_CHATROOMS_FAIL_ACTION = 'LOAD_ALL_CHATROOMS_FAIL';

export const loadAllChatroomsFailAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_CHATROOMS_FAIL_ACTION,
        })
    }
}

//Load All Chatrooms
export const loadAllChatroomsThunkAction = () => async(dispatch) => {
    console.log("All chatrooms Load")
    try {
        const authAxiosConfig = await authAxios();
        await authAxiosConfig.get(`chat/getAllChats`).then(res => {
            console.log('allChats res.data', res.data)
            dispatch(loadAllChatroomsSuccessAction(res.data))
        }).catch(err => {
            console.log("chatroom history load err res", err.response)
            dispatch(loadAllChatroomsFailAction())
        })
    } catch (err) {
        console.error(err)
    }
}