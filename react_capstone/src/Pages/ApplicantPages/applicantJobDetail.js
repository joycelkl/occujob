import React, { useState, useEffect } from "react";
import { Col, Row,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import JobDetail from "../../Components/JobDetail";

const applicantJobDetail = ()=>{
return(
<div>
 <JobDetail/>
 <Button>Message</Button>
 <Button>Apply</Button>
</div>
  );
}

export default applicantJobDetail;