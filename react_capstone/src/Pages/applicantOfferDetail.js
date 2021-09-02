import React, { useState, useEffect } from "react";
import { Col, Row,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import JobDetail from "../Components/JobDetail";

const applicantOfferDetail = ()=>{
return(
<div>
 <JobDetail/>
 <Button>Accept</Button>
 <Button>Reject</Button>
</div>
  );
}

export default applicantOfferDetail;