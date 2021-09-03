import React, { useState } from "react";
import Navbar from "../../Components/Navbar/navbarLogin";
import Signup from '../../Components/SignUpForm';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const EmployerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")

  const dispatch = useDispatch();

  const {registerERuserThunkAction} = bindActionCreators(actionCreators, dispatch)

  function validEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  function handleRegister (e) {
    e.preventDefault();
    if (!email || !password || !name) {
        alert('Please input Name, Email & Password for register')
        return;
    }

    if(!validEmail(email)) {
        alert('Please input valid Email')
    }

    registerERuserThunkAction(name, email, password);

}

  return (
    <div>
      <Navbar />
      <div className="container d-flex">
      <div className="container">
      <h1>Company SignUp Page</h1>
     <Signup onEmailChange={(v)=>setEmail(v)} onPasswordChange={(v)=>setPassword(v)} handleRegister={(e)=>handleRegister(e)} email={email} password={password} onNameChange={(v)=>setName(v)} name={name} type="Company"/>
      </div>
        <div className="container">
            <h3> Free Lancer testing para</h3>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignUp;