import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/home';
import Navbar from "./Components/Navbar/navbarLogin";
import './App.css';
import { createStore } from "redux";
import applicantLogin from './Pages/applicantLogin';
import employerLogin from './Pages/employerLogin';
import SignUpForm from './Components/SignUpForm';
import Login from './Components/LoginForm';
import applicantProfile from './Pages/applicantProfile';
import applicantJobSearch from './Pages/applicantJobSearch';
import applicantJobSearchResult from './Pages/applicantJobSearchResult';

function App() {
  return (
    
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/employerLogin" component={employerLogin,Login} />
          <Route path="/applicantLogin" component={applicantLogin,Login} />
          <Route path="/employerSignup" component={SignUpForm} />
          <Route path="/applicantSignup" component={SignUpForm} />
          <Route path="/applicantProfile" component={applicantProfile} />
          <Route path="/applicantJobSearch" component={applicantJobSearch} />
          <Route path="/applicantJobSearchResult" component={applicantJobSearchResult} />
        </Switch>
      </Router>
    
  );
}

export default App;
