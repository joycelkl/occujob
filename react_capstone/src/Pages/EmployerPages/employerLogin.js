import React from 'react';
import Login from '../../Components/LoginForm'
import Navbar from '../../Components/Navbar/navbarLogin';


const EmployerLogin = () => {


    return (
        <div>
            <Navbar />
            <div>
                <h1>Employer Login Page</h1>
                <Login />
                <a href="/employerSignup">SignUp</a>
            </div>
        </div>
    )
};

export default EmployerLogin;