import { LOAD_SEARCH_ITEM_SUCCESS_ACTION, LOAD_SEARCH_ITEM_FAIL_ACTION } from "../action-creators/applicantJobActionCard"; 

const initialState = {
    searchJob: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SEARCH_ITEM_SUCCESS_ACTION:
            console.log("ACTION SUCCESS", action.payload)
            return action.payload;
        case LOAD_SEARCH_ITEM_FAIL_ACTION:
            console.log("ACTION FAIL")
            return state;
        default:
            console.log("DEFAULT ACTION")
            return state;
    }
}

export default reducer;