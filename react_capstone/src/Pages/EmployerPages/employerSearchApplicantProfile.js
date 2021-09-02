import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const EmployerSearchApplicantProfile = () => {
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <Label for="">FullName</Label><br></br>
                    <Label for="Email">ee_email</Label>
                    
                    <FormGroup>
                        <Label for="Text">Self-Introduction</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Expected Salary">Expected Salary</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Availabilty">Availabilty</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Skill">Skills</Label>
                    </FormGroup>

                    <Label for="Portfolio Link">Optional Portfolio Link</Label>
                    <Button>Download CV</Button>



                </div>
                <div className="col-4">
                    <div className="card">Profile Picture</div>
                </div>
            </div>
            <Button>Message</Button>
        </div>

    )
};

export default EmployerSearchApplicantProfile;