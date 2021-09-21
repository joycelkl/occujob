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
import "./modalFullPage.css";
import ControlledRating from "../../Components/Rating/ControlledRating";
import background from '../../Images/forms.jpg'
import './employerProfilePage.css'
import Chatroom from "../../Components/Chatroom/Chatroom";

const EmployerEditPost = () => {
//toasts
    const offerToast = () => toast("An Offer Has Been Made")
    const fillInfoToast = () => toast("Please Fill In All Information")
    const rateToast= () => toast("Your Rating Has Been Submitted")
    const saveChangesToast= () => toast("Your Changes Have Been Saved")
    

    const indJobState = useSelector((state) => state.individualJob)

    console.log("individual job", indJobState)

    const dispatch = useDispatch()
    const { erJobUpdate } = bindActionCreators
        (actionCreators, dispatch)
    const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadIndJobThunkAction } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        loadLocationThunkAction();
      loadIndustryThunkAction();
      const jobID = localStorage.getItem('job')
      loadIndJobThunkAction(jobID)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const locationState = useSelector((state) => state.location);
    console.log("location", locationState)
    const industryState = useSelector((state) => state.industry);
    console.log("industry", industryState)

    const { job_id, expect_salary, job_title, job_location, job_type, req_exp, job_description, status, expiry_date, jobCreate, job_function, work_period, application_id, job_salary_type, reply, offer, ee_id } = indJobState[0] || {}

    const history = useHistory();

    console.log('data', job_id, expect_salary, job_title, job_location, job_type, req_exp, job_description, status, expiry_date, jobCreate, job_function, work_period, reply)

    const [salary, setSalary] = useState(expect_salary);
    const [jobTitle, setJobTitle] = useState(job_title);
    const [jobLocation, setJobLocation] = useState(job_location);
    const [empType, setEmpType] = useState(job_type);
    const [reqExp, setReqExp] = useState(req_exp);
    const [jobDes, setJobDes] = useState(job_description);
    const [jobStatus, setJobStatus] = useState(status);
    const [jobFunction, setJobFunction] = useState(job_function);
    const [workPeriod, setWorkPeriod] = useState(work_period);
    const [salaryType, setSalaryType] = useState(job_salary_type);
    const [modal, setModal] = useState(false);
    const [modalJob, setModalJob] = useState({});
    const [offering, setoffering] = useState(offer);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [rating, setRating] = useState(0)
    const toggle = () => setModal(!modal);
    const [comment, setComment] = useState('')

    console.log("RATING PASSED FROM CHILD", rating)
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }

    // function toggle(name) {
    //     console.log('toggle name', name)

    //     setModal(!modal);
    // }

    function handleRepost(e) {
        e.preventDefault();
        console.log('repost')
        if (!jobTitle || !jobDes || !reqExp || !salary || !empType || !jobFunction || !jobLocation || !workPeriod) {
            fillInfoToast();
            console.log('submitting')
            return;
        }
        erJobCreate(jobTitle, jobFunction, reqExp, salary,
            jobDes, workPeriod, jobLocation, empType, salaryType).then(() => {
                history.push('/employerJobRecordsList')
            })
    }



    async function applicantRating(ee_id, application_id, rating, comment) {
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post('/employer/CompanyGiveRating', {
            ee_id: ee_id,
            application_id: application_id,
            rate: rating,
            comment: comment,

        }).then(res => {
            console.log("POST SUCCESS", res)
        }).catch(err => {
            console.log("job posting err res", err.response)
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
        if (!jobTitle || !jobDes || !reqExp || !salary || !empType || !jobFunction || !jobLocation || !workPeriod) {
            fillInfoToast();
            return;
        }
        erJobUpdate(job_id, jobTitle, jobFunction, reqExp, salary, jobDes, workPeriod, jobStatus, jobLocation, empType, salaryType).then(() => {
            history.push('/employerJobRecordsList')
            saveChangesToast();
            
        })
    }

    async function giveOffer(application_id) {
        console.log("offer app ID", application_id)
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post(`/employer/job/candidate/offer/${application_id}`)
            .then(res => {
                offerToast()
                setoffering(true)
                console.log(res)
                setModal(!modal);
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
    let createDay = createDate.getDate();
    let createMonth = createDate.getMonth() + 1;
    let createYear = createDate.getFullYear();


    //****************For the Chatroom********************//
    const [modalChatroom, setModalChatroom] = useState(false);

    const toggleChatroom = () => setModalChatroom(!modalChatroom);

    const userID = localStorage.getItem('userID')
    console.log('UserID', userID)
   

    return (
        <div>
            <EmployerNavbar />
            <div >
                <div className="container-fluid mt-0" style={{ display: "flex", justifyContent: "center", backgroundPosition: 'center', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${background})`, backgroundSize: 'cover', marginTop: "0" }}>
                    <div className="col-6" style={{ border: "3px solid black", borderRadius: "5px", padding: "30px", background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))", marginTop: "50px"}}>               
                     <h2 style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'Bold', textDecoration: 'underline', marginBottom: '20px', color: "white" }}>Job Details</h2>
                        <div className="col-6" style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px", color: "white", width:'100%' }} >
                            <div className='row'>
                                <h5>Create Date: {createDay + "/" + createMonth + "/" + createYear}</h5>
                                <h5>Expiry Date: {day + "/" + month + "/" + year}</h5>
                                <div style={{display:"flex", justifyContent:"right"}}>
                                    <h5>Job Status: {status ? 'Active' : 'Inactive'}</h5>
                                    {status ? (<FormGroup check>
                                        <Label check>
                                            <Input style={{marginLeft:"5px", marginRight:"5px"}} type="checkbox" onChange={(e) => handleCheckbokChange(e)} />{' '}
                                            <h6>Deactivate Job</h6>
                                        </Label>
                                    </FormGroup>) : null}
                                </div>
                            </div>
                            <Form className='form-group' onSubmit={(e) => handleUpdate(e)}>
                                <FormGroup>
                                    <Label for="Job Title">Job Title</Label>
                                    {status ? <Input style={{marginTop:"15px"}} type="text" name="text" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} disabled /> : <Input type="text" name="text" id="jobTitle" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />}
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}} for="Text">Job Description</Label>
                                    <Input style={{marginTop:"15px"}}  type="textarea" name="text" id="intro" placeholder="Job Description" value={jobDes} onChange={(e) => setJobDes(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="requiredExp">Required Experience</Label>
                                    <Input style={{marginTop:"15px"}}  type="number" name="number" id="requiredExp" placeholder="Year of Experience" value={reqExp} onChange={(e) => setReqExp(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="employmentType">Salary Type</Label>
                                    <Input style={{marginTop:"15px"}}  type="select" name="employmentType" id="employmentType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                                        <option value={'perJob'}>Per Job</option>
                                        <option value={'perHour'}>Per Hour</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="Expected Salary">Salary</Label>
                                    <Input style={{marginTop:"15px"}}  type="number" name="number" id="Salary" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="employmentType">Employment Type</Label>
                                    <Input style={{marginTop:"15px"}}  type="select" name="employmentType" id="employmentType" value={empType} onChange={(e) => setEmpType(e.target.value)}>
                                        <option>Freelance</option>
                                        <option>Part Time</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="JobFunction">Job Function</Label>
                                    <Input style={{marginTop:"15px"}}  type="select" name="JobFunction" id="JobFunction" value={jobFunction} onChange={(e) => setJobFunction(e.target.value)}>
                                        <option value={null} selected>Please select</option>
                                        {industryState.length > 0 ? industryState.map((industry, i) => (
                                            <option key={i} value={industry.industry} selected>{industry.industry}</option>
                                        )) : "loading..."}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="workPeriod">Work Period</Label>
                                    <Input style={{marginTop:"15px"}}  type="text" name="workPeriod" id="workPeriod" placeholder="" value={workPeriod} onChange={(e) => setWorkPeriod(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label style={{marginTop:"15px"}}  for="preferworklocation">Work Location</Label>
                                    <Input style={{marginTop:"15px"}}  type="select" name="location" id="location" placeholder="location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}>
                                        <option value={null} selected>Please select</option>
                                        {locationState.length > 0 ? locationState.map((location, i) => (
                                            <option key={i} value={location.location} selected>{location.location}</option>
                                        )) : "loading..."}
                                    </Input>
                                </FormGroup>
                                <div className='row' style={{marginTop:"20px", float:"right", marginBottom:"20px"}}>
                                    {status ? <Button type='submit' style={{width:"140px"}}>Save Changes</Button> : null}
                                    <Button onClick={(e) => handleRepost(e)} style={{width:"140px", marginLeft:"10px"}}>Repost</Button>
                                    
                                </div>
                            </Form>
                        </div>

                        <Table style={{color:"black", backgroundColor:"white", borderRadius:"5px"}} striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Date of Application</th>
                                    <th>Offer</th>
                                    <th>Reply</th>
                                </tr>
                            </thead>

                            <tbody>
                                {indJobState.length ? indJobState.map((job) => (
                                    <tr onClick={() => {
                                        setModalJob(job)
                                        toggle(job.ee_name)
                                    }
                                    }
                                        key={job.ee_id} style={{ cursor: "pointer" }}>
                                        <td>{job.ee_name}</td>
                                        <td>{job.created_at}</td>
                                        {offering ? <td> Offer Sent</td> : <td> No Offer</td>}
                                        {job.reply === true ? <td>Accepted </td> : (job.reply === false ? <td>Declined</td> : <td> No Reply</td>)}
                                    </tr>

                                )) : "Waiting for Applicant Apply"}
                                <Modal isOpen={modal} toggle={toggle} fade={false} className='modal-sandbox'>
                                <ModalBody className='modal-content'>    
                                    <div className="row">
                                    <div className="col-md-4">
                                    <div className="profile-img">
                                        <img src={modalJob.ee_img_data} width="200px" height="200x" alt='' />
                                        </div>
                                        </div>
                                        <div className=" col-md-6">
                            <div className="profile-head">
                                <FormGroup>
                                    <Label for="Name"><h1>Applicant's Name</h1></Label>
                                    <h4>{modalJob.ee_name}</h4>
                                </FormGroup>
                                </div>
                                {/* <DisabledRating rating={averageRating} /> */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        {/* <p className="nav-link active" id="home-tab">About</p> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    <div className="row">
                        <div className="col-md-4">

                        </div>

                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">


                                    <div>
                                        <div className="row">
                                            <FormGroup>
                                                <div className="col-md-6">
                                                    <Label for="Text">Self-Introduction</Label>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.self_intro}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>
                                                <div className="col-md-6">
                                                    <Label for="Skill">Skills</Label>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.ee_skill}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>
                                                <div className="col-md-6">
                                                    <Label for="Skill">No. of Year of Working Experience</Label>
                                                </div>
                                                <div className="col-md-6">

                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.ee_exp}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>
                                                <div className="col-md-6">
                                                    <Label for="Text">Job Function</Label>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.ee_industry}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>
                                                <div className="col-md-6">
                                                    <Label for="Text">Perferred Location</Label>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.ee_location}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>

                                                <div className="col-md-6">
                                                    <Label for="Availabilty">Availabilty</Label>
                                                </div>
                                                <div className="col-md-6">

                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.availability}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>

                                                <div className="col-md-6">
                                                    <Label for="Availabilty">Expected Salary</Label>
                                                </div>
                                                <div className="col-md-6">

                                                    <h6 style={{ marginTop: "10px" }}>{modalJob.expected_salary}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                </div>
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="primary" onClick={toggleChatroom}>Message</Button>{' '}
                                        <Button color="secondary" onClick={() => giveOffer(application_id)}>Offer</Button>
                                        <Button color="success" onClick={toggleNested}>Rate Applicant</Button>
                                        <Button color="primary" onClick={toggle}>Close</Button>{' '}
                                        <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined} fade={false} className="test">
                                            <ModalHeader className='smallModal'>Ratings</ModalHeader>
                                            <ModalBody className='smallModal'>
                                                <ControlledRating ratingValue={(value) => setRating(value)} />
                                            </ModalBody>
                                            <ModalBody className='smallModal'>
                                                <h1>Comments:</h1>
                                                <Input style={{ marginTop: "10px" }} type="textarea" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={comment} onChange={(e) => setComment(e.target.value)} />
                                            </ModalBody>
                                            <ModalFooter className='smallModal'>
                                                <Button color="primary" onClick={() => applicantRating(ee_id, application_id, rating, comment).then(rateToast()).then(toggleNested)}>Rate</Button>{' '}
                                                <Button color="primary" onClick={toggleNested}>Close</Button>{' '}
                                            </ModalFooter>
                                        </Modal>
                                    </ModalFooter>
                                </Modal>
                                <>
                        <Modal isOpen={modalChatroom} toggle={toggleChatroom} fade={false}>
                            <ModalHeader toggle={toggleChatroom}>Chatroom</ModalHeader>
                            <ModalBody>
                            <Chatroom chatterID={modalJob.ee_id} userID={userID}/>
                            </ModalBody>
                            <ModalFooter>
                            <Button color="secondary" onClick={toggleChatroom}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        </>
                            </tbody>
                        </Table>
                    <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    

    )
};

export default EmployerEditPost;
