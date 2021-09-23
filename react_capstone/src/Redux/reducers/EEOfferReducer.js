import { LOAD_OFFER_SUCCESS_ACTION, LOAD_OFFER_FAIL_ACTION } from '../action-creators';

const initialState = {
    eeOffer: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_OFFER_SUCCESS_ACTION:
            return action.payload;
        case LOAD_OFFER_FAIL_ACTION:
            return state;
        default:
            return state;
    }
}

export default reducer;