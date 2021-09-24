import { LOAD_SKILLS_SUCCESS_ACTION, LOAD_SKILLS_FAIL_ACTION } from "../action-creators";
const initialState = {
    skills: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SKILLS_SUCCESS_ACTION:
            return action.payload;
        case LOAD_SKILLS_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;