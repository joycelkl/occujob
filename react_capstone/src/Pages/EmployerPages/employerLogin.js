import React from 'react';
import Login from '../../Components/LoginForm'
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import Navbar from '../../../src/Components/Navbar/navbarLogin';


const EmployerLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {loginERuserThunkAction} = bindActionCreators(actionCreators, dispatch)

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

        loginERuserThunkAction();


    }


return(
    <div>
    <Navbar />
    <div>
    <Login onEmailChange={(v)=>setEmail(v)} onPasswordChange={(v)=>setPassword(v)} handleLogin={(e)=>handleLogin(e)} email={email} password={password}/>
    <a href="/employerSignup">SignUp</a>
    </div>
</div>
)
};

export default EmployerLogin;