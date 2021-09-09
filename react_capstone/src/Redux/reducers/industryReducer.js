import { LOAD_INDUSTRY_SUCCESS_ACTION, LOAD_INDUSTRY_FAIL_ACTION } from "../action-creators";
const initialState = {
    industry: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INDUSTRY_SUCCESS_ACTION:
            console.log("ACTION SUCCESS", action.payload)
            return action.payload;
        case LOAD_INDUSTRY_FAIL_ACTION:
            console.log("ACTION FAIL")
            return state;
        default:
            console.log("DEFAULT ACTION")
            return state;
    }
}

export default reducer;