import { EE_VIEW_ER_RATING_SUCCESS_ACTION, EE_VIEW_ER_RATING_FAIL_ACTION } from "../action-creators/applicantViewCompanyRatingAction";

const initialState = {
    erRating: [],
};

const reducer = (state = initialState.erRating, action) => {
    switch (action.type) {
        case EE_VIEW_ER_RATING_SUCCESS_ACTION:
            return state.concat(action.payload)
        case EE_VIEW_ER_RATING_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;