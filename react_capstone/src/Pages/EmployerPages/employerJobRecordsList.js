import React, { useEffect } from 'react';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import EmployerJobRecordCard from '../../Components/Employer/EmployerJobRecordCard';
import './employerJobRecord.css';

const EmployerJobRecordsList = () => {

    const employerJobState = useSelector((state) => state.employerJob)
    const dispatch = useDispatch();

    const { erJobRecordAction } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        erJobRecordAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <div>

            <EmployerNavbar />
            <section className="jobListHeader">


                <div className="jobListText-box" id="home">
                    <h1>Job Records</h1>
                    <p>Manage Your Applicants!</p>
                    <a href="/employerApplicantSearch" className="Homebtn">Search Applicants</a>
                </div>
            </section>
            <div className="jobCard">
                {employerJobState.length > 0 ? employerJobState.map(job => <EmployerJobRecordCard key={job.job_id} job={job} />) : 
                <p><h1 style={{display:"flex", justifyContent:'center', marginTop:'15vh'}}>Please Create Your First Job</h1></p>}
            </div>
        </div>
    )
};

export default EmployerJobRecordsList;