import { LOAD_EMPLOYER_CREATED_RATING_SUCCESS_ACTION, LOAD_EMPLOYER_CREATED_RATING_FAIL_ACTION } from "../action-creators";

const initialState = {
    employerCreatedRating: [],
};

const reducer = (state = initialState.employerCreatedRating, action) => {
    switch (action.type) {
        case LOAD_EMPLOYER_CREATED_RATING_SUCCESS_ACTION:
            console.log('action in port', action)
            return state.concat(action.payload)
        case LOAD_EMPLOYER_CREATED_RATING_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;