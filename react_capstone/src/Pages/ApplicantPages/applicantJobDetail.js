import React from "react";
import { Button } from 'reactstrap';
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
        <JobDetail />
      </div>
    </div>
  );
}

export default ApplicantJobDetail;
