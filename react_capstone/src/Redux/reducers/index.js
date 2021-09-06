import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import employerProfileReducer from './employerProfileReducer'
import employerJobReducer from './employerJobReducer';

const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    erProfile: employerProfileReducer,
    employerJob: employerJobReducer,

})

export default reducers