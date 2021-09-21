import { LOAD_CHATROOM_HISTORY_SUCCESS_ACTION, LOAD_CHATROOM_HISTORY_FAIL_ACTION, ADD_CHATROOM_HISTORY_SUCCESS_ACTION } from '../action-creators'


const initialState = {
    chatroomHistory: [],
};

const reducer = (state = initialState.chatroomHistory, action) => {
    switch (action.type) {
        case LOAD_CHATROOM_HISTORY_SUCCESS_ACTION:
            console.log('chat history in action', action.payload)
            console.log('chat his state in action', state)
            return action.payload
        case LOAD_CHATROOM_HISTORY_FAIL_ACTION:
            return state;
        case ADD_CHATROOM_HISTORY_SUCCESS_ACTION:
            return state.concat(action.payload)
                // case DELETE_APP_PORTFOLIO_SUCCESS_ACTION:
                //     console.log('action in delete', action)
                //     return state.filter((portfolio) => {
                //         console.log('port in delete return', portfolio)
                //         console.log('action[0] in delete return', action.payload)
                //         return portfolio.portfolio_id !== action.payload[0].portfolio_id
                //     });
        default:
            return state;
    }
}

export default reducer;