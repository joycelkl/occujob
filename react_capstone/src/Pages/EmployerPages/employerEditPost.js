import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';


const EmployerEditPost = () => {

    const indJobState = useSelector((state) => state.individualJob)

    console.log("individual job", indJobState)
    
    const dispatch = useDispatch()
    const {erJobUpdate} = bindActionCreators(actionCreators, dispatch)
    const { job_id, expect_salary, job_title, job_location, job_type, req_exp, job_description, status, expiry_date, jobCreate, job_function, work_period } = indJobState[0] || {}

    console.log('data', job_id, expect_salary, job_title, job_location, job_type, req_exp, job_description, status, expiry_date, jobCreate, job_function, work_period)

    const [salary, setSalary] = useState(expect_salary || '...Loading');
    const [jobTitle, setJobTitle] = useState(job_title || '...Loading');
    const [jobLocation, setJobLocation] = useState(job_location || '...Loading');
    const [empType, setEmpType] = useState(job_type || '...Loading');
    const [reqExp, setReqExp] = useState(req_exp || '...Loading');
    const [jobDes, setJobDes] = useState(job_description || '...Loading');
    const [jobStatus, setJobStatus] = useState(status || '...Loading');
    const [jobFunction, setJobFunction] = useState(job_function || '...Loading');
    const [workPeriod, setWorkPeriod] = useState(work_period || '...Loading');


    function handleRepost() {
        console.log('repost')
    }

    function handleUpdate(e) {
        e.preventDefault();
        erJobUpdate(job_id, jobTitle, jobFunction, reqExp, salary, jobDes, workPeriod, status, jobLocation, empType).then(()=>{
                alert("updated")
            })
    }

    function handleCheckbokChange(e) {
        console.log("Checked", e.target.checked)
        e.target.checked == true ? setJobStatus(false) : setJobStatus(true);
        console.log(e.target.value)
    }

    return (
        <div>
            <EmployerNavbar />
            <div className="Container">
                <h2>Job Detail</h2>
                <div className="col-6">
                    <div className='row'>
                        <h5>Create Date: {jobCreate}</h5>
                        <h5>Expiry Date: {expiry_date}</h5>
                        <div>
                            <h5>Job Status: {jobStatus ? 'Active' : 'Inactive'}</h5>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={(e) => handleCheckbokChange(e)} />{' '}
                                    Deactive Job Post
                                </Label>
                            </FormGroup>
                        </div>
                    </div>
                    <Form className='form-group' onSubmit={(e) => handleUpdate(e)}>
                        <FormGroup>
                            <Label for="Job Title">Job Title</Label>
                            {jobStatus ? <Input type="text" name="text" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} disabled /> : <Input type="text" name="text" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />}
                        </FormGroup>
                        <FormGroup>
                            <Label for="Text">Job Description</Label>
                            <Input type="textarea" name="text" id="intro" placeholder="Job Description" value={jobDes} onChange={(e) => setJobDes(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="requiredExp">Required Experience</Label>
                            <Input type="number" name="number" id="requiredExp" placeholder="Year of Experience" value={reqExp} onChange={(e) => setReqExp(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Expected Salary">Salary</Label>
                            <Input type="number" name="number" id="Salary" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="employmentType">Employment Type</Label>
                            <Input type="select" name="employmentType" id="employmentType" value={empType} onChange={(e) => setEmpType(e.target.value)}>
                                <option>Freelance</option>
                                <option>Part Time</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="JobFunction">Job Function</Label>
                            <Input type="textarea" name="text" id="JobFunction" placeholder="Job Function" value={jobFunction} onChange={(e) => setJobFunction(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="workPeriod">Work Period</Label>
                            <Input type="text" name="workPeriod" id="workPeriod" placeholder="" value={workPeriod} onChange={(e) => setWorkPeriod(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="preferworklocation">Work Location</Label>
                            <Input type="select" name="select" id="preferworklocation" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}>
                                <option>Islands</option>
                                <option>Kwai Tsing</option>
                                <option>North</option>
                                <option>Sai Kung</option>
                                <option>Sha Tin</option>
                            </Input>
                        </FormGroup>
                        <div className='row'>
                            <Button type='submit'>Save Changes</Button>
                            <Button onClick={(e) => handleRepost(e)}>Repost</Button>
                        </div>
                    </Form>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Application</th>
                            <th>Offer</th>
                        </tr>
                    </thead>

                    <tbody>
                        {indJobState.length > 0 ? indJobState.map((job) => (
                            <tr key={job.ee_id}>
                                <td>{job.ee_name}</td>
                                <td>{job.created_at}</td>
                                <td>{job.offer}</td>
                            </tr>

                        )) : "loading..."}
                    </tbody>


                </Table>

            </div>
        </div>

    )
};

export default EmployerEditPost;