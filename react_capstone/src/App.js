import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './Pages/home';
import './App.css';
import ApplicantLogin from './Pages/ApplicantPages/applicantLogin';
import EmployerLogin from './Pages/EmployerPages/employerLogin';
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
import ApplicantSignUp from './Pages/ApplicantPages/applicantSignup';
import EmployerSignUp from './Pages/EmployerPages/employerSignup';

const PublicRoute = ({component, ...rest}) => {
  const {isAuthenticated, user} = useSelector((state) => state.auth)
  const Component = component;
  console.log('user', user)
  console.log('isAuth',isAuthenticated)
  if (Component != null) {
    return (
      <Route
      {...rest}
      render={(props)=>
        isAuthenticated ? ((user) && (user === 'er') ?
          (<Redirect to={{
            pathname: "/employerHomePage",
            state: {from: props.location},}}/>) : 
            (<Redirect to={{
              pathname: "/applicantHomePage",
              state: {from: props.location},}}/>)
        ) : (
      <Component {...props} />
        ) 
      }
    />
    );
  } else {
    return null;
  }
}

const PrivateRoute = ({component, ...rest}) =>{
  const {isAuthenticated} = useSelector((state) => state.auth)
  const Component = component;
  if (Component != null) {
    return (
      <Route
      {...rest}
      render={(props)=>
        isAuthenticated ? (
      <Component {...props} />
        ) : ( 
          <Redirect to={{
            pathname: "/",
            state: {from: props.location},
          }}
          />
        )
      }
    />
    );
  } else {
    return null;
  }
}


function App() {
    return (

        <Router >
        <Switch>
        <PublicRoute path = "/" exact component = { Home }/> 
        <PublicRoute path = "/employerLogin" component = { EmployerLogin } /> 
        <PublicRoute path = "/applicantLogin" component = { ApplicantLogin } /> 
        <PublicRoute path = "/employerSignup" component = { EmployerSignUp } /> 
        <PublicRoute path = "/applicantSignup" component = { ApplicantSignUp } /> 
        <PrivateRoute path = "/employerHomePage" component = { EmployerHomePage } /> 
        <PrivateRoute path = "/employerProfilePage" component = { EmployerProfilePage } /> 
        <PrivateRoute path = "/employerCreateJobPage"  component = { EmployerCreateJobPage }/> 
        <PrivateRoute path = "/employerJobRecordsList" component = { EmployerJobRecordsList }/> 
        <PrivateRoute path = "/employerApplicantProfile" component = { EmployerApplicantProfile }/> 
        <PrivateRoute path = "/employerEditPost" component = { EmployerEditPost }/> 
        <PrivateRoute path = "/employerApplicantSearch" component = { EmployerApplicantSearch } /> 
        <PrivateRoute path = "/employerApplicantSearchList" component = { EmployerApplicantSearchList }/> 
        <PrivateRoute path = "/employerSearchApplicantProfile" component = { EmployerSearchApplicantProfile }/> 
        <PrivateRoute path = "/applicantProfile" component = { ApplicantProfile }/> 
        <PrivateRoute path = "/applicantJobSearch" component = { ApplicantJobSearch }/> 
        <PrivateRoute path = "/applicantJobSearchResult" component = { ApplicantJobSearchResult }/> 
        <PrivateRoute path = "/applicantJobDetail" component = { ApplicantJobDetail } /> 
        <PrivateRoute path = "/applicantOfferList" component = { ApplicantOfferList } /> 
        <PrivateRoute path = "/applicantOfferDetail" component = { ApplicantOfferDetail }/> 
        <PrivateRoute path = "/applicantHomePage" component = { ApplicantHomePage } />
        </Switch>
        </ Router>

    );
}

export default App;