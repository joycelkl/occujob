import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const JobDetail= ()=>{
return(

<div className="container mt-2">
    <div className="col-6">
        <Form className="form-group" >
        <FormGroup>
            <Label for="Job Title">Job Title</Label>
            <Input type="text" name="text" id="jobTitle" placeholder="" value="jobTitle" disabled/>
            <FormGroup>
                <Label for="Text">Job Description</Label>
                <Input type="textarea" name="text" id="intro" placeholder="" value="jobDescription" disabled/>
            </FormGroup>
        </FormGroup>
        <FormGroup>
            <Label for="Years of Experience">Years of Experience</Label>
            <Input type="number" name="number" id="yearsOfExperience" placeholder="" value="exp" disabled/>
        </FormGroup>

        <FormGroup>
            <Label for="Expected Salary">Salary</Label>
            <Input type="number" name="number" id="Salary" placeholder="Salary" value="salary" disabled/>
        </FormGroup>
        <FormGroup>
            <Label for="employmentType">Employment Type</Label>
            <Input type="select" name="employmentType" id="employmentType" value="empType" disabled>
                <option>Freelance</option>
                <option>Part-Time</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label for="JobFunction">JobFunction</Label>
            <Input type="textarea" name="text" id="JobFunction" placeholder="" value="jobFunction" disabled/>
        </FormGroup>
        <FormGroup>
            <Label for="preferworklocation">Work Location</Label>
            <Input type="select" name="select" id="preferworklocation" value="location" disabled>
                <option>Islands</option>
                <option>Kwai Tsing</option>
                <option>North</option>
                <option>Sai Kung</option>
                <option>Sha Tin</option>
            </Input>
        </FormGroup>
        <Button>Accept</Button>
        <Button>Reject</Button>
        <Button>Apply</Button>
        <Button>Message</Button>
        </Form>
    </div>
</div>
)
}
export default JobDetail;