import React from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import Job from "../../Components/Job";
import {useSelector } from 'react-redux';


const ApplicantJobSearchResult = ()=>{

  const jobSearchState = useSelector((state) => state.appJobSearch);
  console.log('job search result',jobSearchState)

  return(
  <div>
    <ApplicantNavbar />
    <h1>Search Result</h1>
    {jobSearchState.length > 0 ? jobSearchState.map((job)=>(
      <ul key={job.job_id} >
      <Job job={job}/>
    </ul>
    )) : null}
  </div>
    );
}


export default ApplicantJobSearchResult;