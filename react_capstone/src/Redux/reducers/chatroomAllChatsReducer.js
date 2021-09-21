import { LOAD_ALL_CHATROOMS_SUCCESS_ACTION, LOAD_ALL_CHATROOMS_FAIL_ACTION } from '../action-creators'


const initialState = {
    allChatrooms: [],
};

const reducer = (state = initialState.allChatrooms, action) => {
    switch (action.type) {
        case LOAD_ALL_CHATROOMS_SUCCESS_ACTION:
            return action.payload
        case LOAD_ALL_CHATROOMS_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;