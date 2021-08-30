import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const applicantProfile = () => {
return(
    <div>
    <div className="row">
        <div className="col-6">
     <Label for="">FullName</Label><br></br>
    <Label for="exampleEmail">ee_email</Label>
    <FormGroup>
        <Label for="">Phone Number</Label>
        <Input type="number" name="phone" id="exampleEmail" placeholder="ee_phone"/>
      </FormGroup>
    <FormGroup>
        <Label for="Text">Self-Introduction</Label>
        <Input type="textarea" name="text" id="intro" placeholder="intro" />
      </FormGroup>
      <FormGroup>
        <Label for="Skill">Skills</Label>
        <Input type="textarea" name="text" id="Skill" placeholder="Tags" />
      </FormGroup>
      <FormGroup>
        <Label for="JobFunction">JobFunction</Label>
        <Input type="textarea" name="text" id="JobFunction" placeholder="ee_industry" />
      </FormGroup>
      <FormGroup>
        <Label for="Expected Salary">Expected Salary</Label>
        <Input type="number" name="number" id="Expected Salary" placeholder="Expected Salary" />
      </FormGroup>
      <FormGroup>
        <Label for="Availabilty">Availabilty</Label>
        <Input type="text" name="number" id="Availabilty" placeholder="Availabilty" />
      </FormGroup>
      </div>
      <div className="col-4">
          <div className="card">img place holder</div>
      </div>
      </div>
    </div>
    
)
};

export default applicantProfile;