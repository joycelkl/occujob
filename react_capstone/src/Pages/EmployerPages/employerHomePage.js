import React, { useEffect, useState } from 'react';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../homePage.css"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import EmployerHomeCard from '../../Components/Employer/EmployerHomeJobCard';



const EmployerHomePage = () => {
    const employerJobState = useSelector((state) => state.employerJob)
    const dispatch = useDispatch();

    const { loadEmployerJobThunkAction } = bindActionCreators(actionCreators, dispatch)
    const [ userName, setUserName] = useState(null)

    useEffect(() => {
        loadEmployerJobThunkAction();   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('employer Job', employerJobState)

    useEffect(() => {
        if(employerJobState.length > 0) {
            setUserName (employerJobState.pop())
        }  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employerJobState])
   

    console.log('poped', userName)

    return (
        <div>
            <EmployerNavbar />
            <section className="header">


                <div className="text-box" id="home">
                    <h1>HKFreelancer</h1>
                    <p>Welcome {userName}</p>
                    <a href="/employerCreateJobPage" className="Homebtn">Post A Job</a>
                </div>
            </section>
            <div className="jobCard">

                {employerJobState.length > 0 ? employerJobState.map((employerJob, index) => (
                    <EmployerHomeCard
                        key={index}
                        employerJob={employerJob}
                    />
                )) : "loading..."}
            </div>
        </div>
    )
};

export default EmployerHomePage;