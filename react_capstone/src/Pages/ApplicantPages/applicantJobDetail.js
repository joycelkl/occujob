import React from "react";
import JobDetail from "../../Components/JobDetail";
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import { useSelector } from 'react-redux'

const ApplicantJobDetail = () => {

  const jobDetailState = useSelector((state) => state.individualJob);
  console.log('individual Job result',jobDetailState)

  return (
    <div>
      <ApplicantNavbar />
      <div>
        <JobDetail 
        indJob={jobDetailState}/>

      </div>
    </div>
  );
}

export default ApplicantJobDetail;
