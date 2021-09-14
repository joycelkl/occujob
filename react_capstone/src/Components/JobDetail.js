import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import authAxios from '../Redux/authAxios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Pages/EmployerPages/employerProfilePage.css"

const JobDetail = (props) => {
    const applyToast = () => toast("You Have Applied this Job")
    const { indJob } = props;
    const { er_id, job_title, job_id, er_name, job_function, job_type, job_location, er_img_data, job_description, work_period, expect_salary, req_exp } = indJob[0];
    console.log("???", job_id, job_title)

    const dispatch = useDispatch();

    const { loadErProfileThunkAction } = bindActionCreators(actionCreators, dispatch)

    async function applyJob(job_id) {
        console.log("offer app ID", job_id)
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post(`/employee/search/result/${job_id}`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log("pubulic job load err res", err.response)
            })
    }

    const history = useHistory();

    function handleOnClick() {
        applyToast()
        loadErProfileThunkAction(er_id).then(() => {
            history.push('/applicantEmployerDetails')
        })
    }




    return (

        <div class="container emp-profile">
            <div class="container emp-profile">
                <Form className="form-group" >
                    <div class="row">
                        {/* <div className="employerDetails" onClick={handleOnClick} style={{ cursor: "pointer" }}> */}
                        <div class="col-md-4">
                            <div class="profile-img" onClick={handleOnClick} style={{ cursor: "pointer" }}>
                                <img src={er_img_data} width="200px" height="200x" alt='logo' />
                                <br />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head" style={{marginTop:"25px"}}>
                                <Label for="CompanyName" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Company Name</Label>
                                <Input type="text" name="text" id="CompanyName" placeholder="" value={er_name} disabled style={{marginBottom:"10px"}}/>
                                <Label for="Job Title" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Job Title</Label>
                                <Input type="text" name="text" id="jobTitle" placeholder="" value={job_title} disabled />
                            </div>
                        </div>
                        {/* </div> */}
                        <div className="nav nav-tabs" style={{ marginTop: "10px", marginBottom:"30px" }}></div>
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
                        <Label for="preferworklocation" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Work Period</Label>
                        <Input type="text" name="select" id="preferworklocation" value={work_period} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px"}}>Work Location</Label>
                        <Input type="text" name="select" id="preferworklocation" value={job_location} disabled />
                    </FormGroup>
                    <div style={{marginTop:"20px", float:"right"}}>
                    <Button onClick={() => applyJob(job_id)} style={{marginRight:"10px"}}>Apply</Button>
                    <Button>Message</Button>
                    </div>
                </Form>
            </div>
            <ToastContainer />
        </div >
    )
}
export default JobDetail;
