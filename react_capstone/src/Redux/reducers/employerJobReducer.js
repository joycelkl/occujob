import { LOAD_EMPLOYER_JOB_SUCCESS_ACTION, LOAD_EMPLOYER_JOB_FAIL_ACTION } from '../action-creators';

const initialState = {
    employerJob: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EMPLOYER_JOB_SUCCESS_ACTION:
            return action.payload;
        case LOAD_EMPLOYER_JOB_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;