import React from "react";
import { Card, Badge } from 'react-bootstrap';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useHistory } from 'react-router';
import "../../Pages/EmployerPages/employerProfilePage.css"
import 'react-toastify/dist/ReactToastify.css';
const ApplicantOfferCard = (props) => {
        //toast
        const acceptToast = () => toast("You Have Accepted This Offer")
        const declineToast = () => toast("You Have Declined This Offer")

        const dispatch = useDispatch();
        const { offerAcceptAction } = bindActionCreators(actionCreators, dispatch)
        const { offerDeclineAction } = bindActionCreators(actionCreators, dispatch)
        const { loadErProfileThunkAction } = bindActionCreators(actionCreators, dispatch)


        const { offerCard } = props;
        const { job_function,reply, job_title, job_id,er_id, er_name, created_at, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp, application_id } = offerCard;

        console.log("testoffer", offer)
        console.log('data', job_title, job_id, er_name, created_at, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp, application_id)
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);

        
//to employer profile page
        const history = useHistory();
        function handleOnClick() {
            loadErProfileThunkAction(er_id).then(() => {
                history.push('/applicantEmployerDetails')
            })
        }


        function handleAccept() {
            console.log('application id', application_id)
            offerAcceptAction(application_id)
        }

        function handleDecline() {
            console.log('application id', application_id)
            offerDeclineAction(application_id)
        }


        //date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return(
        <div style={{ display: "flex", justifyContent: "center" }}>

    <Card className='my-4' style={{ width: "70%" }}>
    <Card.Body onClick={() => setModal(!modal)}>
        <div className="d-flex justify-content-between" >
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {day + "/" + month + "/" + year}
                </Card.Subtitle>
                {offer? <p className="flex" style={{backgroundColor:"green"}}>{String(offer)}</p>: <p></p>}
                <Badge className="job-list-badge" variant="secondary" style={{marginRight:'5px'}}>{job_type}</Badge>
                <Badge className="job-list-badge" variant="secondary">{job_location}</Badge>
                </div>
        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test"/>:<p></p>}
        </div>
    </Card.Body>
    <div>
      <Modal isOpen={modal} toggle={toggle} fade={false} >
        {/* <ModalHeader toggle={toggle}>
            <div class="container emp-profile">
            <div class="container emp-profile">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img" onClick={handleOnClick} style={{ cursor: "pointer" }}>
                                <img src={er_img_data} width="200px" height="200x" alt='' />
                                <br />
                            </div>
                        </div>
                        <div class="col-md-4 offset-md-4">
                            <div class="profile-head" style={{marginTop:"25px"}}>
                                <Label for="CompanyName" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Company Name</Label>
                                <Input type="text" name="text" id="CompanyName" placeholder="" value={er_name} disabled style={{marginBottom:"10px"}}/>
                                <Label for="Job Title" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Job Title</Label>
                                <Input type="text" name="text" id="jobTitle" placeholder="" value={job_title} disabled />
                            </div>
                        </div>
                        <div className="nav nav-tabs" style={{ marginTop: "10px", marginBottom:"30px" }}></div>
                    </div>
                    </div>
                    </div>
</ModalHeader>   */}
        <ModalBody style={{width:"100%", height:"100%"}}>
        <div class="container emp-profile">
            <div class="container emp-profile">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img" onClick={handleOnClick} style={{ cursor: "pointer" }}>
                                <img src={er_img_data} width="200px" height="200x" alt='' />
                                <br />
                            </div>
                        </div>
                        <div class="col-md-4 offset-md-4">
                            <div class="profile-head" style={{marginTop:"25px"}}>
                                <Label for="CompanyName" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Company Name</Label>
                                <Input type="text" name="text" id="CompanyName" placeholder="" value={er_name} disabled style={{marginBottom:"10px"}}/>
                                <Label for="Job Title" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Job Title</Label>
                                <Input type="text" name="text" id="jobTitle" placeholder="" value={job_title} disabled />
                            </div>
                        </div>
                        <div className="nav nav-tabs" style={{ marginTop: "10px", marginBottom:"30px" }}></div>
                    </div>
                    </div>
                    </div>
                    <FormGroup>
                        <Label for="Text" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Job Description</Label>
                        <Input type="textarea" name="text" id="intro" placeholder="" value={job_description} disabled style={{marginBottom:"20px"}}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Years of Experience" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Years of Experience</Label>
                        <Input type="number" name="number" id="yearsOfExperience" placeholder="" value={req_exp} disabled style={{marginBottom:"20px"}} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Expected Salary" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Salary</Label>
                        <Input type="number" name="number" id="Salary" placeholder="Salary" value={expect_salary} disabled style={{marginBottom:"20px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="employmentType" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Employment Type</Label>
                        <Input type="select" name="employmentType" id="employmentType" value={job_type} disabled style={{marginBottom:"20px"}}>
                            <option>Freelance</option>
                            <option>Part-Time</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="JobFunction" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>JobFunction</Label>
                        <Input type="textarea" name="text" id="JobFunction" placeholder="" value={job_function} disabled style={{marginBottom:"20px"}}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Work Location</Label>
                        <Input type="text" name="select" id="preferworklocation" value={job_location} disabled />
                    </FormGroup>
        </ModalBody>
        <ModalFooter>
            {reply === null ? <Button color="primary" onClick={()=>handleAccept()}>accept</Button> : null }
            {reply === null ? <Button color="primary" onClick={()=>handleDecline()}>decline</Button> : null }
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        <ToastContainer />
      </Modal>
    </div>
</Card>
</div>
)
}
export default ApplicantOfferCard;