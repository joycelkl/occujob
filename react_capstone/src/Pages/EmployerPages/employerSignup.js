import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/navbarLogin";
import Signup from '../../Components/SignUpForm';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useHistory } from 'react-router';
import {Row, Col} from "reactstrap";

const EmployerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")

  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, error } = authState
  const history = useHistory();

  const dispatch = useDispatch();

  const { registerERuserThunkAction } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/employerHomePage')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  function validEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!email || !password || !name) {
      alert('Please input Name, Email & Password for register')
      return;
    }

    if (!validEmail(email)) {
      alert('Please input valid Email')
    }

    registerERuserThunkAction(name, email, password);

  }

  return (
    <div>
      <Navbar />
      <div className="LoginHeader">
        <div className="container-fluid">
          <Row>
            <Col lg="7">
          <div className="container" style={{ border: "3px solid black", padding: "80px", background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))", marginTop: "15vh",  borderRadius: "25px", color: "white" }}>
            <h1>Employer SignUp Page</h1>
            <Signup onEmailChange={(v) => setEmail(v)} onPasswordChange={(v) => setPassword(v)} handleRegister={(e) => handleRegister(e)} email={email} password={password} onNameChange={(v) => setName(v)} name={name} type="Company" />
            {error && alert(error)}
          </div>
          </Col>
          <Col lg="5">
          <div className="container">
            <div style={{ marginTop: "25vh" }}>
              <h1 style={{ fontSize: "55px" }}>Ready To Find Your Next Applicant?</h1>
              <p style={{ fontSize: "28px", lineHeight: "40px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quae neque quia maxime quos
                delectus, eveniet asperiores in possimus nisi eius non. Illo quod enim hic fuga quas iure eius?
              </p>
            </div>
          </div>
          </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignUp;