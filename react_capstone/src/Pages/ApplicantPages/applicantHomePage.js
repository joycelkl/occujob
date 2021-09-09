import React, { useEffect } from 'react';
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import "../homePage.css"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ApplicantHomeCard from '../../Components/Applicants/ApplicantHomeJobCard';


const ApplicantHomePage = () => {
    const applicantJobState = useSelector((state) => state.applicantJob)
    const dispatch = useDispatch();
  
    const { loadApplicantJobThunkAction } = bindActionCreators(actionCreators, dispatch)
 
    useEffect(() => {
        loadApplicantJobThunkAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('Applicant', applicantJobState)
    return (
        <div>
            <ApplicantNavbar />
            <section className="header">


                <div className="text-box" id="home">
                    <h1>HKFreelancer</h1>
                    <p>Welcome User</p>
                    <a href="/applicantJobSearch" className="Homebtn">Search Jobs</a>
                </div>
            </section>
            <div className="jobCard">
                {applicantJobState.length > 0 ? applicantJobState.map((applicantJob, index) => (
                    <ApplicantHomeCard
                        key={index}
                        applicantJob={applicantJob}
                    />
                )) : "loading..."}
            </div>
        </div>
    )
};

export default ApplicantHomePage;
