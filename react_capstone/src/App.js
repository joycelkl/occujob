import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/home';
import Navbar from "./components/Navbar/navbarLogin";
import './App.css';
import { createStore } from "redux";
import applicantLogin from './Pages/applicantLogin';
import employerLogin from './Pages/employerLogin';
import SignUpForm from './components/SignUpForm';
import Login from './components/LoginForm';
import applicantProfile from './Pages/applicantProfile';
 
const rootReducer = (state) => {
  return {
    linksFromReduxStore: [
      { title: 'Google', url: 'http://www.google.com' },
      { title: 'Yahoo', url: 'http://www.yahoo.com' },
    ]
  }
};
const store = createStore(
rootReducer, 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
        </Switch>
      </Router>
    
  );
}

export default App;
