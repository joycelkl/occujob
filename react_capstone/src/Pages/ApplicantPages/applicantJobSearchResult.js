import React, { useEffect } from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import Job from "../../Components/Job";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import './search.css'


const ApplicantJobSearchResult = ()=>{

  const dispatch = useDispatch();
  const { appJobSearch } = bindActionCreators(actionCreators, dispatch)

  const jobSearchState = useSelector((state) => state.appJobSearch);

  useEffect(()=>{
 
      const retrievedObject = localStorage.getItem('jobSearch');
      const parsed = JSON.parse(retrievedObject)
      const {jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary} = parsed
      appJobSearch(jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary)
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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