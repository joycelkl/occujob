import React, { useState, useEffect } from "react";
import { Col, Row,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import JobDetail from "../../Components/JobDetail";
import ApplicantNavbar
 from "../../Components/Navbar/navbarApplicant";
const ApplicantOfferDetail = ()=>{
return(
<div>
  <ApplicantNavbar />
 <JobDetail/>
 <Button>Accept</Button>
 <Button>Reject</Button>
</div>
  );
}

export default ApplicantOfferDetail;