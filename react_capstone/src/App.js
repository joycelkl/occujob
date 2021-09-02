import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/home';
import Navbar from "./Components/Navbar/navbarLogin";
import './App.css';
import applicantLogin from './Pages/applicantLogin';
import employerLogin from './Pages/employerLogin';
import SignUpForm from './Components/SignUpForm';
import applicantProfile from './Pages/ApplicantPages/applicantProfile';
import applicantJobSearch from './Pages/ApplicantPages/applicantJobSearch';
import applicantJobSearchResult from './Pages/ApplicantPages/applicantJobSearchResult';
import applicantJobDetail from './Pages/ApplicantPages/applicantJobDetail';
import applicantOfferList from './Pages/ApplicantPages/applicantOfferList';
import applicantOfferDetail from './Pages/ApplicantPages/applicantOfferDetail';



function App() {
  return (
    
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/employerLogin" component={employerLogin} />
          <Route path="/applicantLogin" component={applicantLogin} />
          <Route path="/employerSignup" component={SignUpForm} />
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
