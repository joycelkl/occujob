import { LOAD_CHATROOM_ID_SUCCESS_ACTION, LOAD_CHATROOM_ID_FAIL_ACTION } from '../action-creators'


const initialState = {
    chatroomID: '',
};

const reducer = (state = initialState.chatroomID, action) => {
    switch (action.type) {
        case LOAD_CHATROOM_ID_SUCCESS_ACTION:
            console.log('action in port', action)
            return action.payload
        case LOAD_CHATROOM_ID_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;