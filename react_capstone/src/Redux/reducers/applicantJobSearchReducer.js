import { LOAD_COMPANY_NAME_SUCCESS_ACTION, LOAD_COMPANY_NAME_FAIL_ACTION } from "../action-creators"; 

const initialState = {
    compName: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMPANY_NAME_SUCCESS_ACTION:
            console.log("ACTION SUCCESS", action.payload)
            return action.payload;
        case LOAD_COMPANY_NAME_FAIL_ACTION:
            console.log("ACTION FAIL")
            return state;
        default:
            console.log("DEFAULT ACTION")
            return state;
    }
}

export default reducer;