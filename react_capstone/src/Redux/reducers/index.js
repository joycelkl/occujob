import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import employerProfileReducer from './employerProfileReducer'
import employerJobReducer from './employerJobReducer';
import applicantJobCardReducer from './applicantJobCardReducer'

const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    erProfile: employerProfileReducer,
    employerJob: employerJobReducer,
    applicantJob: applicantJobCardReducer,

})

export default reducers