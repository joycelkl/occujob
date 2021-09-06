import { SAVE_TOKEN_SUCCESS_ACTION, SAVE_TOKEN_FAIL_ACTION } from '../action-creators'


const initialState = {
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN_SUCCESS_ACTION:
            return action.payload;
        case SAVE_TOKEN_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;