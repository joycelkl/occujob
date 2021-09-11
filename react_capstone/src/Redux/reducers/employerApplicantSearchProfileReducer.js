import { LOAD_APPLICANT_SEARCH_PROFILE_SUCCESS_ACTION, LOAD_APPLICANT_SEARCH_PROFILE_FAIL_ACTION } from '../action-creators'


const initialState = {
    profile: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_APPLICANT_SEARCH_PROFILE_SUCCESS_ACTION:
            return action.payload;
        case LOAD_APPLICANT_SEARCH_PROFILE_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;