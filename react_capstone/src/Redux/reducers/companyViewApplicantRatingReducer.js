import { ER_VIEW_EE_RATING_SUCCESS_ACTION, ER_VIEW_EE_RATING_FAIL_ACTION } from "../action-creators/companyViewApplicantRatingAction";

const initialState = {
    eeRating: [],
};

const reducer = (state = initialState.eeRating, action) => {
    switch (action.type) {
        case ER_VIEW_EE_RATING_SUCCESS_ACTION:
            console.log('action in port', action)
            return state.concat(action.payload)
        case ER_VIEW_EE_RATING_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;