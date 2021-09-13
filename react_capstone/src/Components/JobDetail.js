import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import authAxios from '../Redux/authAxios';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import { useHistory } from 'react-router';

const JobDetail = (props) => {
    const { indJob } = props;
    const { er_id, job_title, job_id, er_name, job_function, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp } = indJob[0];
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
        loadErProfileThunkAction(er_id).then(()=>{
            history.push('/applicantEmployerDetails')
        })}
    
        


    return (

        <div className="container mt-2">
            <div className="col-6">
                <Form className="form-group" >
                    <div className="employerDetails" onClick={handleOnClick} style={{cursor:"pointer"}}>
                        
                        <img src={er_img_data} width="200px" height="200x" alt=''/>
                        <br/>
                        <Label for="CompanyName">Company Name</Label>
                        <Input type ="text" name="text" id="CompanyName" placeholder="" value={er_name} disabled/>
                        <Label for="Job Title">Job Title</Label>
                        <Input type ="text" name="text" id="jobTitle" placeholder="" value={job_title} disabled/>
                 
                </div>
                    <FormGroup>
                        <Label for="Text">Job Description</Label>
                        <Input type="textarea" name="text" id="intro" placeholder="" value={job_description} disabled />
                    </FormGroup>
                
                <FormGroup>
                    <Label for="Years of Experience">Years of Experience</Label>
                    <Input type="number" name="number" id="yearsOfExperience" placeholder="" value={req_exp} disabled />
                </FormGroup>

                <FormGroup>
                    <Label for="Expected Salary">Salary</Label>
                    <Input type="number" name="number" id="Salary" placeholder="Salary" value={expect_salary} disabled />
                </FormGroup>
                <FormGroup>
                    <Label for="employmentType">Employment Type</Label>
                    <Input type="select" name="employmentType" id="employmentType" value={job_type} disabled>
                        <option>Freelance</option>
                        <option>Part-Time</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="JobFunction">JobFunction</Label>
                    <Input type="textarea" name="text" id="JobFunction" placeholder="" value={job_function} disabled />
                </FormGroup>
                <FormGroup>
                    <Label for="preferworklocation">Work Location</Label>
                    <Input type="text" name="select" id="preferworklocation" value={job_location} disabled />
                </FormGroup>
                <Button onClick={() => applyJob(job_id)}>Apply</Button>
                <Button>Message</Button>
            </Form>
        </div>
</div >
)
}
export default JobDetail;
