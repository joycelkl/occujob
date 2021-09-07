import { LOAD_INDIVIDUAL_JOB_SUCCESS_ACTION, LOAD_INDIVIDUAL_JOB_FAIL_ACTION } from '../action-creators'


const initialState = {
    jobDetail: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INDIVIDUAL_JOB_SUCCESS_ACTION:
            return action.payload;
        case LOAD_INDIVIDUAL_JOB_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;