import React from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import Job from "../../Components/Job";
import {useSelector } from 'react-redux';
import './search.css'

const ApplicantJobSearchResult = ()=>{

  const jobSearchState = useSelector((state) => state.appJobSearch);
  console.log('job search result',jobSearchState)

  return(
  <div>
    <ApplicantNavbar />
    <section className="searchResultsHeader">


<div className="searchResultsText-box" id="home">
    <h1>Search Results</h1>
    <p>Find Your Next Big Job!</p>
    <a href="/applicantJobSearch" className="searchResultsHomebtn">Search Jobs</a>
</div>
</section>
    {jobSearchState.length > 0 ? jobSearchState.map((job)=>(
      <ul key={job.job_id} >
      <Job job={job}/>
    </ul>
    )) : null}
  </div>
    );
}


export default ApplicantJobSearchResult;