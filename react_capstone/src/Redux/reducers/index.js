import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import EEProfileReducer from './EEProfileReducer'
import employerProfileReducer from './employerProfileReducer'
import employerJobReducer from './employerJobReducer';
import applicantJobCardReducer from './applicantJobCardReducer'
import individualJobReducer from './individualJobReducer'

const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    EEProfile: EEProfileReducer,
    erProfile: employerProfileReducer,
    employerJob: employerJobReducer,
    applicantJob: applicantJobCardReducer,
    individualJob: individualJobReducer,

})

export default reducers