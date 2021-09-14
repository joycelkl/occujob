import React from "react";
import JobDetail from "../../Components/JobDetail";
import ApplicantNavbar
 from "../../Components/Navbar/navbarApplicant";
const ApplicantOfferDetail = ()=>{
return(
<div>
  <ApplicantNavbar />
  <div className="container">
  <h2>Offer Detail</h2>
  <JobDetail/>
  <br></br>
 </div>
</div>
  );
}

export default ApplicantOfferDetail;