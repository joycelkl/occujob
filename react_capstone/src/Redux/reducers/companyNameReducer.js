import { LOAD_COMPANY_NAME_SUCCESS_ACTION, LOAD_COMPANY_NAME_FAIL_ACTION } from "../action-creators";

const initialState = {
    companyName: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMPANY_NAME_SUCCESS_ACTION:
            return action.payload;
        case LOAD_COMPANY_NAME_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;