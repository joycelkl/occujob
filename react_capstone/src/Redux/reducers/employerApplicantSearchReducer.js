import { LOAD_SEARCH_APPLICANT_SUCCESS_ACTION, LOAD_SEARCH_APPLICANT_FAIL_ACTION } from '../action-creators'


const initialState = {
    appSearchResult: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SEARCH_APPLICANT_SUCCESS_ACTION:
            return action.payload
        case LOAD_SEARCH_APPLICANT_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;