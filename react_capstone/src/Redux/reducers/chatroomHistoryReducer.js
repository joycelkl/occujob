import { LOAD_CHATROOM_HISTORY_SUCCESS_ACTION, LOAD_CHATROOM_HISTORY_FAIL_ACTION, ADD_CHATROOM_HISTORY_SUCCESS_ACTION } from '../action-creators'


const initialState = {
    chatroomHistory: [],
};

const reducer = (state = initialState.chatroomHistory, action) => {
    switch (action.type) {
        case LOAD_CHATROOM_HISTORY_SUCCESS_ACTION:
            return action.payload
        case LOAD_CHATROOM_HISTORY_FAIL_ACTION:
            return state;
        case ADD_CHATROOM_HISTORY_SUCCESS_ACTION:
            return state.concat(action.payload)
        default:
            return state;
    }
}

export default reducer;