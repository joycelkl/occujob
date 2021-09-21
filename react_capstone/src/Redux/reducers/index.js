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
import employerApplicantSearchReducer from "./employerApplicantSearchReducer";
import companyNameReducer from './companyNameReducer'
import employerApplicantSearchProfileReducer from './employerApplicantSearchProfileReducer'
import applicantJobSearchReducer from './applicantJobSearchReducer'
import applicantPortfolioReducer from './applicantPortfolioReducer'
import chatroomIdReducer from './chatroomIdReducer'
import chatroomHistoryReducer from './chatroomHistoryReducer'
import chatroomAllChatsReducer from './chatroomAllChatsReducer'
import chatroomUnreadMsgReducer from './chatroomUnreadMsgReducer'
import navbarUnreadMsgReducer from './narbarUnreadMsgReducer'

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
    applicantSearch: employerApplicantSearchReducer,
    profile: employerApplicantSearchProfileReducer,
    appJobSearch: applicantJobSearchReducer,
    appPortfolio: applicantPortfolioReducer,
    chatroomID: chatroomIdReducer,
    chatHistory: chatroomHistoryReducer,
    allChats: chatroomAllChatsReducer,
    unreadMsgCount: chatroomUnreadMsgReducer,
    navUnreadMsgCount: navbarUnreadMsgReducer,
})

export default reducers