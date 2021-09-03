import React from 'react';
import Login from '../../Components/LoginForm'
import Navbar from '../../Components/Navbar/navbarLogin';
const ApplicantLogin = () => {
return(
    <div>
        <Navbar />
    <div>
        <h1>Applicant Login Page</h1>
        <Login/>
    <a href="/applicantSignup">SignUp</a>
    </div>
    </div>
)
};

export default ApplicantLogin;