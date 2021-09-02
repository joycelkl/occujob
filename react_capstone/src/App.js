import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/home';
import Navbar from "./Components/Navbar/navbarLogin";
import './App.css';
import applicantLogin from './Pages/ApplicantPages/applicantLogin';
import employerLogin from './Pages/EmployerPages/employerLogin';
import SignUpForm from './Components/SignUpForm';
import applicantProfile from './Pages/ApplicantPages/applicantProfile';
import applicantJobSearch from './Pages/ApplicantPages/applicantJobSearch';
import applicantJobSearchResult from './Pages/ApplicantPages/applicantJobSearchResult';
import applicantJobDetail from './Pages/ApplicantPages/applicantJobDetail';
import applicantOfferList from './Pages/ApplicantPages/applicantOfferList';
import applicantOfferDetail from './Pages/ApplicantPages/applicantOfferDetail';
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
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/employerLogin" component={employerLogin} />
        <Route path="/applicantLogin" component={applicantLogin} />
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
        <Route path="/applicantProfile" component={applicantProfile} />
        <Route path="/applicantJobSearch" component={applicantJobSearch} />
        <Route path="/applicantJobSearchResult" component={applicantJobSearchResult} />
        <Route path="/applicantJobDetail" component={applicantJobDetail} />
        <Route path="/applicantOfferList" component={applicantOfferList} />
        <Route path="/applicantOfferDetail" component={applicantOfferDetail} />
      </Switch>
    </Router>

  );
}

export default App;
