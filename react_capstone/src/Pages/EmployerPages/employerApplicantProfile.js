import React from "react";
import { useSelector } from 'react-redux';
import { Button, FormGroup, Label,} from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";

const EmployerApplicantProfile = () => {

    
    const indJobState = useSelector((state) => state.individualJob)

    console.log("individual job", indJobState)

    return (
        <div>
            <EmployerNavbar />
            <div className="row">
                <div className="col-6">
                    <Label for="">Applicant's Name</Label><br></br>
                    
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
            <Button>Offer</Button>
        </div>

    )
};

export default EmployerApplicantProfile;