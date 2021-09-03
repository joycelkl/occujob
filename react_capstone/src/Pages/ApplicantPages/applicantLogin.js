import React from 'react';
import Login from '../../Components/LoginForm'
import Navbar from '../../Components/Navbar/navbarLogin';
const ApplicantLogin = () => {
return(
    <div>
        <Navbar />
    <div>
        <Login/>
    <a href="/applicantSignup">SignUp</a>
    </div>
    </div>
)
};

export default ApplicantLogin;