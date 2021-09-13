import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import authAxios from '../../Redux/authAxios';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployerEditPost = () => {
    
    const offerToast = () => toast("An Offer Has Been Made")
    const fillInfoToast = () => toast("Please Fill In All Information")
    const indJobState = useSelector((state) => state.individualJob)

    console.log("individual job", indJobState)

    const dispatch = useDispatch()
    const { erJobUpdate } = bindActionCreators
    (actionCreators, dispatch)
    const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        loadLocationThunkAction();
      loadIndustryThunkAction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const locationState = useSelector((state) => state.location);
    console.log("location", locationState)
    const industryState = useSelector((state) => state.industry);
    console.log("industry", industryState)
    
    const { job_id, expect_salary, job_title, job_location, job_type, req_exp, job_description, status, expiry_date, jobCreate, job_function, work_period, application_id, job_salary_type } = indJobState[0] || {}

    const history = useHistory();

    console.log('data', job_id, expect_salary, job_title, job_location, job_type, req_exp, job_description, status, expiry_date, jobCreate, job_function, work_period)

    const [salary, setSalary] = useState(expect_salary );
    const [jobTitle, setJobTitle] = useState(job_title);
    const [jobLocation, setJobLocation] = useState(job_location );
    const [empType, setEmpType] = useState(job_type );
    const [reqExp, setReqExp] = useState(req_exp );
    const [jobDes, setJobDes] = useState(job_description );
    const [jobStatus, setJobStatus] = useState(status );
    const [jobFunction, setJobFunction] = useState(job_function);
    const [workPeriod, setWorkPeriod] = useState(work_period);
    const[salaryType, setSalaryType] = useState(job_salary_type);
    const [modal, setModal] = useState(false);
    const [modalJob, setModalJob] = useState({});

    function toggle(name) {
        console.log('toggle name', name)
        
        setModal(!modal);
    }

    function handleRepost(e) {
        e.preventDefault();
        console.log('repost')
        if (!jobTitle || !jobDes || !reqExp || !salary || !empType || !jobFunction || !jobLocation || !workPeriod ) {
            fillInfoToast();
            console.log('submitting')
            return;
        }
        erJobCreate(jobTitle, jobFunction, reqExp, salary,
            jobDes, workPeriod, jobLocation, empType, salaryType).then(() => {
                history.push('/employerJobRecordsList')
            })
    }

    async function erJobCreate(jobTitle, jobFunction, reqExp, expectSalary,
        jobDescription, workPeriod, location, jobType, salaryType) {
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post('/employer/job/posting', {
            jobTitle: jobTitle,
            jobFunction: jobFunction,
            reqExp: reqExp,
            expectSalary: expectSalary,
            jobDescription: jobDescription,
            workPeriod: workPeriod,
            location: location,
            jobType: jobType,
            salaryType: salaryType
        }).then(res => {
            console.log('job reposted')
        }).catch(err => {
            console.log("job posting err res", err.response)
        })
    }

    function handleUpdate(e) {
        e.preventDefault();
        if (!jobTitle || !jobDes || !reqExp || !salary || !empType || !jobFunction || !jobLocation || !workPeriod ) {
            fillInfoToast();
            return;
        }
        erJobUpdate(job_id, jobTitle, jobFunction, reqExp, salary, jobDes, workPeriod, jobStatus, jobLocation, empType, salaryType).then(()=>{
                alert("updated")
                history.push('/employerJobRecordsList')
            })
    }

    async function giveOffer(application_id){
        console.log("offer app ID",application_id)
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post(`/employer/job/candidate/offer/${application_id}`)
        .then(res => {
            offerToast()
           console.log(res)
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
        })
    }

    function handleCheckbokChange(e) {
        console.log("Checked", e.target.checked)
        e.target.checked === true ? setJobStatus(false) : setJobStatus(true);
        console.log(e.target.value)
        console.log("status:", jobStatus)
    }


    //date format
    let date = new Date(expiry_date)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let createDate = new Date(jobCreate)
    let createDay = date.getDate();
    let createMonth = date.getMonth() + 1;
    let createYear = date.getFullYear();
    return (
        <div>
            <EmployerNavbar />
            <div className="Container">
                <h2>Job Detail</h2>
                <div className="col-6">
                    <div className='row'>
                        <h5>Create Date: {createDay + "/" + createMonth + "/" + createYear}</h5>
                        <h5>Expiry Date: {day + "/" + month + "/" + year}</h5>
                        <div>
                            <h5>Job Status: {status ? 'Active' : 'Inactive'}</h5>
                            {status? (<FormGroup check>
                                <Label check>
                                    <Input type="checkbox" onChange={(e) => handleCheckbokChange(e)} />{' '}
                                    Deactivate Job Post
                                </Label>
                            </FormGroup>):null}
                        </div>
                    </div>
                    <Form className='form-group' onSubmit={(e) => handleUpdate(e)}>
                        <FormGroup>
                            <Label for="Job Title">Job Title</Label>
                            {status ? <Input type="text" name="text" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} disabled /> : <Input type="text" name="text" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />}
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
                            <Label for="employmentType">Salary Type</Label>
                            <Input type="select" name="employmentType" id="employmentType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                                <option value={'perJob'}>Per Job</option>
                                <option value={'perHour'}>Per Hour</option>
                            </Input>
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
                            <Input type="select" name="JobFunction" id="JobFunction"  value={jobFunction} onChange={(e) => setJobFunction(e.target.value)}>
                          <option value={null} selected>Please select</option>
                          {industryState.length > 0 ? industryState.map((industry, i) => (
                            <option key={i} value={industry.industry} selected>{industry.industry}</option>
                          )) : "loading..."}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="workPeriod">Work Period</Label>
                            <Input type="text" name="workPeriod" id="workPeriod" placeholder="" value={workPeriod} onChange={(e) => setWorkPeriod(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="preferworklocation">Work Location</Label>
                            <Input type="select" name="location" id="location" placeholder="location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}>
                          <option value={null} selected>Please select</option>
                          {locationState.length > 0 ? locationState.map((location, i) => (
                            <option key={i} value={location.location} selected>{location.location}</option>
                          )) : "loading..."}
                            </Input>
                        </FormGroup>
                        <div className='row'>
                            {status?<Button type='submit'>Save Changes</Button>:null}
                            <Button onClick={(e) => handleRepost(e)}>Repost</Button>
                            <ToastContainer />
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
                        {indJobState[0].ee_name ? indJobState.map((job) => (
                            <tr onClick={() => {
                                setModalJob(job)
                                toggle(job.ee_name)}
                            } 
                                key={job.ee_id} style={{ cursor: "pointer" }}>
                            
                                <td>{job.ee_name}</td>
                                <td>{job.created_at}</td>
                                <td>{job.offer}</td>
                            </tr>

                        )) : "Waiting for Applicant Apply"}
                        <Modal isOpen={modal} toggle={toggle} fade={false}>

                                    <ModalHeader>{modalJob.ee_name} {console.log('nametest', modalJob.ee_name)} 
                                    <img src={modalJob.ee_img_data} width="200px" height="200x" alt=''/>
                                    </ModalHeader>
                                    <ModalBody>
                                        Self Introduction: {modalJob.self_intro} <br />
                                        Expected Salary: {modalJob.expected_salary} <br />
                                        Skills: {modalJob.ee_industry} <br />
                                        Location Preference: {modalJob.ee_location} <br />
                                        availability: {modalJob.availability}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={toggle}>Message</Button>{' '}
                                        <Button color="secondary" onClick={()=>giveOffer(application_id)}>Offer</Button>
                                    </ModalFooter>
                                </Modal>
                    </tbody>
                </Table>

            </div>
        </div>

    )
};

export default EmployerEditPost;
