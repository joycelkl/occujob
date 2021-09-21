import { LOAD_APPLICANT_RATING_SUCCESS_ACTION, LOAD_APPLICANT_RATING_FAIL_ACTION } from "../action-creators/applicantRatingAction";

const initialState = {
    applicantRating: [],
};

const reducer = (state = initialState.applicantRating, action) => {
    switch (action.type) {
        case LOAD_APPLICANT_RATING_SUCCESS_ACTION:
            console.log('action in port', action)
            return state.concat(action.payload)
        case LOAD_APPLICANT_RATING_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;