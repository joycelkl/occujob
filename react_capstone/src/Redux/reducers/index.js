import { combineReducers } from "redux";
import authReducer from './authReducer'
import publicJobReducer from './publicJobReducer'
import EEProfileReducer from './EEProfileReducer'
import employerProfileReducer from './employerProfileReducer'
import employerJobReducer from './employerJobReducer';
import applicantJobCardReducer from './applicantJobCardReducer'
import EEOfferReducer from './EEOfferReducer'
import individualJobReducer from './individualJobReducer'
import skillsReducer from './skillsReducer'
import locationReducer from './locationReducer'
import industryReducer from './industryReducer'
import companyNameReducer from './companyNameReducer'
const reducers = combineReducers({
    auth: authReducer,
    publicJob: publicJobReducer,
    EEProfile: EEProfileReducer,
    erProfile: employerProfileReducer,
    employerJob: employerJobReducer,
    applicantJob: applicantJobCardReducer,
    EEOffer: EEOfferReducer,
    individualJob: individualJobReducer,
    skills: skillsReducer,
    location: locationReducer,
    industry: industryReducer,
    companyName: companyNameReducer,

})

export default reducers