import { LOAD_SKILLS_SUCCESS_ACTION, LOAD_SKILLS_FAIL_ACTION } from "../action-creators";
const initialState = {
    skills: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SKILLS_SUCCESS_ACTION:
            console.log("ACTION SUCCESS", action.payload)
            return action.payload;
        case LOAD_SKILLS_FAIL_ACTION:
            console.log("ACTION FAIL")
            return state;
        default:
            console.log("DEFAULT ACTION")
            return state;
    }
}

export default reducer;