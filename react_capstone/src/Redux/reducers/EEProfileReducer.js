import { LOAD_EE_PROFILE_SUCCESS_ACTION, LOAD_EE_PROFILE_FAIL_ACTION } from '../action-creators'


const initialState = {
    EEProfile: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EE_PROFILE_SUCCESS_ACTION:
            return action.payload;
        case LOAD_EE_PROFILE_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;