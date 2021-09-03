import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";

const EmployerCreateJobPage = () => {
    return (
        <div>
            <EmployerNavbar />
            <div className="row">
                <div className="col-6">
                    <FormGroup>
                        <Label for="Job Title">Job Title</Label>
                        <Input type="text" name="text" id="jobTitle" placeholder="" />
                        <FormGroup>
                            <Label for="Text">Job Description</Label>
                            <Input type="textarea" name="text" id="intro" placeholder="" />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Years of Experience">Years of Experience</Label>
                        <Input type="number" name="number" id="yearsOfExperience" placeholder="" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="Expected Salary">Salary</Label>
                        <Input type="number" name="number" id="Salary" placeholder="Salary" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation">Employment Type</Label>
                        <Input type="select" name="select" id="employmentType">
                            <option>Freelance</option>
                            <option>Part Time</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="JobFunction">JobFunction</Label>
                        <Input type="textarea" name="text" id="JobFunction" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation">Work Location</Label>
                        <Input type="select" name="select" id="preferworklocation">
                            <option>Islands</option>
                            <option>Kwai Tsing</option>
                            <option>North</option>
                            <option>Sai Kung</option>
                            <option>Sha Tin</option>
                        </Input>
                    </FormGroup>
                </div>

            </div>
            <Button>Post</Button>
        </div>

    )
};

export default EmployerCreateJobPage;