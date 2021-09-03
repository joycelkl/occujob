import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import JobDetail from "../../Components/JobDetail";
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';


const ApplicantJobDetail = () => {
  return (
    <div>
      <ApplicantNavbar />
      <div>
        <JobDetail />
        <Button>Message</Button>
        <Button>Apply</Button>
      </div>
    </div>
  );
}

export default ApplicantJobDetail;