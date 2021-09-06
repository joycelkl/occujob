import { LOAD_ER_PROFILE_SUCCESS_ACTION, LOAD_ER_PROFILE_FAIL_ACTION } from '../action-creators'


const initialState = {
    ErProfile: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ER_PROFILE_SUCCESS_ACTION:
            console.log('action payload', action.payload)
            return action.payload;
        case LOAD_ER_PROFILE_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;