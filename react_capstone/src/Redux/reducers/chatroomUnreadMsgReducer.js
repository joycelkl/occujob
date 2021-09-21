import { LOAD_UNREAD_MSG_SUCCESS_ACTION, LOAD_UNREAD_MSG_FAIL_ACTION, RESET_UNREAD_MSG_SUCCESS_ACTION } from '../action-creators'


const initialState = {
    unreadMsgs: 0,
};

const reducer = (state = initialState.unreadMsgs, action) => {
    switch (action.type) {
        case LOAD_UNREAD_MSG_SUCCESS_ACTION:
            return action.payload
        case LOAD_UNREAD_MSG_FAIL_ACTION:
            return state;
        case RESET_UNREAD_MSG_SUCCESS_ACTION:
            return state - action.payload;
        default:
            return state;
    }
}

export default reducer;