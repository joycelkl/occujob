import React, { useEffect } from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import Job from "../../Components/Job";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';


const ApplicantJobSearchResult = ()=>{

  const dispatch = useDispatch();
  const { appJobSearch } = bindActionCreators(actionCreators, dispatch)

  const jobSearchState = useSelector((state) => state.appJobSearch);
  console.log('job search result',jobSearchState)

  useEffect(()=>{
 
      const retrievedObject = localStorage.getItem('jobSearch');
      const parsed = JSON.parse(retrievedObject)
      console.log('parsed',parsed)
      const {jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary} = parsed
      appJobSearch(jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary)
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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