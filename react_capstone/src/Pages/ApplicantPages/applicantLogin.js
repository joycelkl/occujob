import React from 'react';
import Login from '../../Components/LoginForm'
import Navbar from '../../Components/Navbar/navbarLogin';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';



const ApplicantLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {loginEEuserThunkAction} = bindActionCreators(actionCreators, dispatch)

    function validEmail(email) {
        // eslint-disable-next-line no-useless-escape
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    function handleLogin (e) {
        e.preventDefault();
        if (!email || !password ) {
            alert('Please input login Email & Password')
            return;
        }

        if(!validEmail(email)) {
            alert('Please input valid Email')
        }

        loginEEuserThunkAction(email, password);

    }


return(
        <div>
        <Navbar />
        <div className="container d-flex">
        <div className="container">
        <h1>Applicant Login Page</h1>
        <Login onEmailChange={(v)=>setEmail(v)} onPasswordChange={(v)=>setPassword(v)} handleLogin={(e)=>handleLogin(e)} email={email} password={password}/>
        <a href="/applicantSignup">SignUp</a>
        </div>
            <div className="container">
                <h3> Free Lancer testing para</h3>
            </div>
        </div>

        </div>
)
};

export default ApplicantLogin;