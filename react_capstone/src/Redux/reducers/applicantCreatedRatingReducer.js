import { LOAD_APPLICANT_CREATED_RATING_SUCCESS_ACTION, LOAD_APPLICANT_CREATED_RATING_FAIL_ACTION } from "../action-creators/applicantCreatedRatingAction";

const initialState = {
    applicantCreatedRating: [],
};

const reducer = (state = initialState.applicantCreatedRating, action) => {
    switch (action.type) {
        case LOAD_APPLICANT_CREATED_RATING_SUCCESS_ACTION:
            console.log('action in port rateing', action.payload)
            return action.payload
        case LOAD_APPLICANT_CREATED_RATING_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;