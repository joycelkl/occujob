import { LOAD_INDUSTRY_SUCCESS_ACTION, LOAD_INDUSTRY_FAIL_ACTION } from "../action-creators";
const initialState = {
    industry: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INDUSTRY_SUCCESS_ACTION:
            return action.payload;
        case LOAD_INDUSTRY_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;