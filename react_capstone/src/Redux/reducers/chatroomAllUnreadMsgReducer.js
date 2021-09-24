import { LOAD_ALL_UNREAD_COUNT_SUCCESS_ACTION, LOAD_ALL_UNREAD_COUNT_FAIL_ACTION } from '../action-creators'


const initialState = {
    allUnreadCount: [],
};

const reducer = (state = initialState.allUnreadCount, action) => {
    switch (action.type) {
        case LOAD_ALL_UNREAD_COUNT_SUCCESS_ACTION:
            return action.payload
        case LOAD_ALL_UNREAD_COUNT_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;