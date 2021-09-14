import React from 'react';
import Login from '../../Components/LoginForm'
import Navbar from '../../../src/Components/Navbar/navbarLogin';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Applicant CSS/applicantLogin.css"


const EmployerLogin = () => {
    const noLoginToast = () => toast("Please Input Login Email & Password");
    const wrongEmail = () => toast("Please input valid Email");
    const invalidToast = () => toast("Invalid Email or Password");
    const authState = useSelector((state) => state.auth);
    const { isAuthenticated, error } = authState
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();

    const { loginERuserThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { errorValueAction } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/employerHomePage')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        if (error) {
            invalidToast()
            errorValueAction()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    function validEmail(email) {
        // eslint-disable-next-line no-useless-escape
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log('ER handle Login')
        if (!email || !password) {
            noLoginToast()
            return;
        }

        if (!validEmail(email)) {
            wrongEmail()
        }

        loginERuserThunkAction(email, password)

    }


    return (
        <div>
            <Navbar />
            <div className="LoginHeader">
                <div className="container-fluid d-flex">
                    <div className="container" style={{ border: "1px solid black", padding: "80px", backgroundColor: "rgb(59, 105, 121)", marginTop: "150px", marginLeft: "100px", marginRight: "100px", borderRadius: "25px", color: "white" }}>
                        <h1 >Employer Login Page</h1>
                        <Login link="/employerSignup" onEmailChange={(v)=>setEmail(v)} onPasswordChange={(v)=>setPassword(v)} handleLogin={(e)=>handleLogin(e)} email={email} password={password} />
                        {error && invalidToast()} 
                        <ToastContainer />

                    </div>
                    <div className="container">
                        <div style={{ marginTop: "220px"}}>
                            <h1 style={{fontSize:"55px"}}>Ready To Find Your Next Applicant?</h1>
                            <p style={{fontSize:"28px", lineHeight:"40px"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quae neque quia maxime quos
                                delectus, eveniet asperiores in possimus nisi eius non. Illo quod enim hic fuga quas iure eius?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EmployerLogin;