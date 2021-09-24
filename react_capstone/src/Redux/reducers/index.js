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
import applicantRatingReducer from './applicantRatingReducer'
import employerRatingReducer from './employerRatingReducer'
import applicantCreatedRatingReducer from './applicantCreatedRatingReducer'
import employerCreatedRatingReducer from './employerCreatedRatingReducer'
import eeViewErRatingReducer from './applicantViewCompanyRatingReducer'
import erViewEeRatingReducer from './companyViewApplicantRatingReducer'
import chatroomIdReducer from './chatroomIdReducer'
import chatroomHistoryReducer from './chatroomHistoryReducer'
import chatroomAllChatsReducer from './chatroomAllChatsReducer'
import chatroomUnreadMsgReducer from './chatroomUnreadMsgReducer'
import navbarUnreadMsgReducer from './narbarUnreadMsgReducer'
import chatroomAllUnreadMsgReducer from './chatroomAllUnreadMsgReducer'

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
    applicantRating: applicantRatingReducer,
    employerRating: employerRatingReducer,
    applicantCreatedRating: applicantCreatedRatingReducer,
    employerCreatedRating: employerCreatedRatingReducer,
    eeViewErRating: eeViewErRatingReducer,
    erViewEeRating: erViewEeRatingReducer,
    chatroomID: chatroomIdReducer,
    chatHistory: chatroomHistoryReducer,
    allChats: chatroomAllChatsReducer,
    unreadMsgCount: chatroomUnreadMsgReducer,
    navUnreadMsgCount: navbarUnreadMsgReducer,
    allUnreadCount: chatroomAllUnreadMsgReducer,
})

export default reducers