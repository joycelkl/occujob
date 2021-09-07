import React from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import Job from "../../Components/Job";

const ApplicantJobSearchResult = ()=>{
return(
<div>
  <ApplicantNavbar />
  <h1>Search Result</h1>
  <ul>
    <Job/>
  </ul>
</div>
  );
}


export default ApplicantJobSearchResult;