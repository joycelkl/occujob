import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import EEProfileReducer from './EEProfileReducer'
import employerProfileReducer from './employerProfileReducer'

const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    EEProfile: EEProfileReducer,
    erProfile: employerProfileReducer,

})

export default reducers