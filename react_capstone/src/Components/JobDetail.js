import React from "react";
import { Button, Form, FormGroup, Label} from 'reactstrap';
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
                            <div class="profile-head" style={{ marginTop: "25px" }}>
                                <Label for="CompanyName" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "25px" }}>Company Name</Label>
                                <h4>{er_name}</h4>
                                <Label for="Job Title" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "25px" }}>Job Title</Label>
                                <h4>{job_title}</h4>
                            </div>
                        </div>
                        {/* </div> */}
                        <div className="nav nav-tabs" style={{ marginTop: "10px", marginBottom: "30px" }}></div>
                    </div>
                    <FormGroup>
                        <Label for="Text" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "20px" }}>Job Description</Label>
                        <h5>{job_description}</h5>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Years of Experience" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "20px" }}>Years of Experience</Label>
                        <h5>{req_exp}</h5>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Expected Salary" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "20px" }}>Salary</Label>
                        <h5>{expect_salary}</h5>
                    </FormGroup>
                    <FormGroup>
                        <Label for="employmentType" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "20px" }}>Employment Type</Label>
                        <h5>{job_type}</h5>

                    </FormGroup>
                    <FormGroup>
                        <Label for="JobFunction" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "20px" }}>JobFunction</Label>
                        <h5>{job_function}</h5>
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px", fontSize: "20px" }}>Work Period</Label>
                        <h5>{work_period}</h5>
                    </FormGroup>
                    <FormGroup>
                        <Label for="preferworklocation" style={{fontWeight:"bold", textDecoration:"underline", marginBottom:"5px", fontSize: "20px" }}>Work Location</Label>
                        <h5>{job_location}</h5>
                    </FormGroup>
                    <div style={{ marginTop: "20px", float: "right" }}>
                        <Button onClick={() => applyJob(job_id)} style={{ marginRight: "10px" }}>Apply</Button>
                        <Button>Message</Button>
                    </div>
                </Form>
            </div>
            <ToastContainer />
        </div >
    )
}
export default JobDetail;
