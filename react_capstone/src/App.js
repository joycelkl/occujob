import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/home';
import Navbar from "./Components/Navbar/navbarLogin";
import './App.css';
import ApplicantLogin from './Pages/ApplicantPages/applicantLogin';
import EmployerLogin from './Pages/EmployerPages/employerLogin';
import SignUpForm from './Components/SignUpForm';
import ApplicantProfile from './Pages/ApplicantPages/applicantProfile';
import ApplicantJobSearch from './Pages/ApplicantPages/applicantJobSearch';
import ApplicantJobSearchResult from './Pages/ApplicantPages/applicantJobSearchResult';
import ApplicantJobDetail from './Pages/ApplicantPages/applicantJobDetail';
import ApplicantOfferList from './Pages/ApplicantPages/applicantOfferList';
import ApplicantOfferDetail from './Pages/ApplicantPages/applicantOfferDetail';
import ApplicantHomePage from './Pages/ApplicantPages/applicantHomePage';
import EmployerHomePage from './Pages/EmployerPages/employerHomePage';
import EmployerProfilePage from './Pages/EmployerPages/employerProfilePage';
import EmployerCreateJobPage from './Pages/EmployerPages/employerCreateJobPage';
import EmployerJobRecordsList from './Pages/EmployerPages/employerJobRecordsList';
import EmployerEditPost from './Pages/EmployerPages/employerEditPost';
import EmployerApplicantProfile from './Pages/EmployerPages/employerApplicantProfile';
import EmployerApplicantSearch from './Pages/EmployerPages/employerApplicantSearch';
import EmployerApplicantSearchList from './Pages/EmployerPages/employerApplicantSearchList';
import EmployerSearchApplicantProfile from './Pages/EmployerPages/employerSearchApplicantProfile';



function App() {
  return (

    <Router>
     
        <Route path="/" exact component={Home} />
        <Route path="/employerLogin" component={EmployerLogin} />
        <Route path="/applicantLogin" component={ApplicantLogin} />
        <Route path="/employerSignup" component={SignUpForm} />
        <Route path="/employerHomePage" component={EmployerHomePage} />
        <Route path="/employerProfilePage" component={EmployerProfilePage} />
        <Route path="/employerCreateJobPage" component={EmployerCreateJobPage} />
        <Route path="/employerJobRecordsList" component={EmployerJobRecordsList} />
        <Route path="/employerApplicantProfile" component={EmployerApplicantProfile} />
        <Route path="/employerEditPost" component={EmployerEditPost} />
        <Route path="/employerApplicantSearch" component={EmployerApplicantSearch} />
        <Route path="/employerApplicantSearchList" component={EmployerApplicantSearchList} />
        <Route path="/employerSearchApplicantProfile" component={EmployerSearchApplicantProfile} />
        <Route path="/applicantSignup" component={SignUpForm} />
        <Route path="/applicantProfile" component={ApplicantProfile} />
        <Route path="/applicantJobSearch" component={ApplicantJobSearch} />
        <Route path="/applicantJobSearchResult" component={ApplicantJobSearchResult} />
        <Route path="/applicantJobDetail" component={ApplicantJobDetail} />
        <Route path="/applicantOfferList" component={ApplicantOfferList} />
        <Route path="/applicantOfferDetail" component={ApplicantOfferDetail} />
        <Route path="/applicantHomePage" component={ApplicantHomePage} />
     
    </Router>

  );
}

export default App;
