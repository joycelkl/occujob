import { LOAD_APP_PORTFOLIO_SUCCESS_ACTION, LOAD_APP_PORTFOLIO_FAIL_ACTION, DELETE_APP_PORTFOLIO_SUCCESS_ACTION, ADD_APP_PORTFOLIO_SUCCESS_ACTION } from '../action-creators'


const initialState = {
    appPortfolio: [],
};

const reducer = (state = initialState.appPortfolio, action) => {
    switch (action.type) {
        case LOAD_APP_PORTFOLIO_SUCCESS_ACTION:
            console.log('action in port', action)
            return action.payload
        case LOAD_APP_PORTFOLIO_FAIL_ACTION:
            return state;
        case ADD_APP_PORTFOLIO_SUCCESS_ACTION:
            return state.concat(action.payload)
        case DELETE_APP_PORTFOLIO_SUCCESS_ACTION:
            console.log('action in delete', action)
            return state.filter((portfolio) => {
                console.log('port in delete return', portfolio)
                console.log('action[0] in delete return', action.payload)
                return portfolio.portfolio_id !== action.payload[0].portfolio_id
            });
        default:
            return state;
    }
}

export default reducer;