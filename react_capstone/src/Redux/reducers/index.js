import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import employerProfileReducer from './employerProfileReducer'
import tokenStoreReducer from './employerProfileReducer'

const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    erProfile: employerProfileReducer,
    tokenStore: tokenStoreReducer,

})

export default reducers