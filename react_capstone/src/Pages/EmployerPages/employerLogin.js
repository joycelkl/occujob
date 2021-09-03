import React from 'react';
import Login from '../../Components/LoginForm'
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';


const EmployerLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {loginERuserThunkAction} = bindActionCreators(actionCreators, dispatch)

    function handleLogin () {
        console.log('email & password',email, password)
        console.log('function', loginERuserThunkAction)
    }


return(
    <div>
    <Login onEmailChange={(v)=>setEmail(v)} onPasswordChange={(v)=>setPassword(v)} handleLogin={handleLogin()} email={email} password={password}/>
    <a href="/employerSignup">SignUp</a>
    </div>
)
};

export default EmployerLogin;