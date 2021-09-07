import { LOAD_APPLICANT_JOB_SUCCESS_ACTION, LOAD_APPLICANT_JOB_FAIL_ACTION } from "../action-creators/applicantJobActionCard"; 

const initialState = {
    applicantJob: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_APPLICANT_JOB_SUCCESS_ACTION:
            console.log("ACTION SUCCESS", action.payload)
            return action.payload;
        case LOAD_APPLICANT_JOB_FAIL_ACTION:
            console.log("ACTION FAIL")
            return state;
        default:
            console.log("DEFAULT ACTION")
            return state;
    }
}

export default reducer;