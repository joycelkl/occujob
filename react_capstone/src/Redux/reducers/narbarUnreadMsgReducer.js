import { LOAD_NAVBAR_UNREAD_MSG_SUCCESS_ACTION, LOAD_NAVBAR_UNREAD_MSG_FAIL_ACTION } from '../action-creators'


const initialState = {
    navbarUnreadMsgs: 0,
};

const reducer = (state = initialState.navbarUnreadMsgs, action) => {
    switch (action.type) {
        case LOAD_NAVBAR_UNREAD_MSG_SUCCESS_ACTION:
            return action.payload
        case LOAD_NAVBAR_UNREAD_MSG_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;