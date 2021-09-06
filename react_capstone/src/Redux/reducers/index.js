import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import employerProfileReducer from './employerProfileReducer'

const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    erProfile: employerProfileReducer,

})

export default reducers