import React, { useState, useEffect } from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import Job from "../../Components/Job";

const ApplicantOfferList = ()=>{
return(
<div>
<ApplicantNavbar />
  <h1>Offer List</h1>
  <ul>
    <Job/>
  </ul>
</div>
  );
}





export default ApplicantOfferList;