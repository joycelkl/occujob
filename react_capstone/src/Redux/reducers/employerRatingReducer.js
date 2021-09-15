import { LOAD_EMPLOYER_RATING_SUCCESS_ACTION, LOAD_EMPLOYER_RATING_FAIL_ACTION } from "../action-creators/employerRatingAction";

const initialState = {
    employerRating: [],
};

const reducer = (state = initialState.employerRating, action) => {
    switch (action.type) {
        case LOAD_EMPLOYER_RATING_SUCCESS_ACTION:
            console.log('action in port', action)
            return state.concat(action.payload)
        case LOAD_EMPLOYER_RATING_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;