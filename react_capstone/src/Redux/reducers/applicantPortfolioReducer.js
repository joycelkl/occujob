import { LOAD_APP_PORTFOLIO_SUCCESS_ACTION, LOAD_APP_PORTFOLIO_FAIL_ACTION } from '../action-creators'


const initialState = {
    appPortfolio: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_APP_PORTFOLIO_SUCCESS_ACTION:
            return [...action.payload]
        case LOAD_APP_PORTFOLIO_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;