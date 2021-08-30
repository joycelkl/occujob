import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/home';
import applicantLogin from './Pages/applicantLogin';
import employerLogin from './Pages/employerLogin';
import Navbar from "./components/Navbar/navbarLogin";
import './App.css';

function App() {
  return (
    
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/employerLogin" component={employerLogin} />
          <Route path="/applicantLogin" component={applicantLogin} />
        </Switch>
      </Router>
    
  );
}

export default App;
