import React, { useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../homePage.css"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import EmployerHomeCard from '../../Components/Employer/EmployerHomeJobCard';
import { FaTruckLoading } from 'react-icons/fa';


const EmployerHomePage = () => {
    const employerJobState = useSelector((state) => {
        {console.log("Employer Job:", state.employerJob)}
        return state.employerJob})
    const dispatch = useDispatch();

    const { loadEmployerJobThunkAction } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        loadEmployerJobThunkAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('employer Job', employerJobState)

    
    return (
        <div>
            <EmployerNavbar />
            <section className="header">


                <div className="text-box" id="home">
                    <h1>HKFreelancer</h1>
                    <p>Welcome User</p>
                    <a href="/employerCreateJobPage" className="Homebtn">Post A Job</a>
                </div>
            </section>
        <div className="jobCard">
            
        {employerJobState.length > 0 ? employerJobState.map((employerJob, index) => (
                    <EmployerHomeCard
                        key={index}
                        employerJob={employerJob}
                    />
                )): "loading..." }
            </div>
        </div>
    )
};

export default EmployerHomePage;