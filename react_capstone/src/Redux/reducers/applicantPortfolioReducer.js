import { LOAD_APP_PORTFOLIO_SUCCESS_ACTION, LOAD_APP_PORTFOLIO_FAIL_ACTION, DELETE_APP_PORTFOLIO_SUCCESS_ACTION, ADD_APP_PORTFOLIO_SUCCESS_ACTION } from '../action-creators'


const initialState = {
    appPortfolio: [],
};

const reducer = (state = initialState.appPortfolio, action) => {
    switch (action.type) {
        case LOAD_APP_PORTFOLIO_SUCCESS_ACTION:
            return action.payload
        case LOAD_APP_PORTFOLIO_FAIL_ACTION:
            return state;
        case ADD_APP_PORTFOLIO_SUCCESS_ACTION:
            return state.concat(action.payload)
        case DELETE_APP_PORTFOLIO_SUCCESS_ACTION:
            return state.filter((portfolio) => {
                return portfolio.portfolio_id !== action.payload[0].portfolio_id
            });
        default:
            return state;
    }
}

export default reducer;