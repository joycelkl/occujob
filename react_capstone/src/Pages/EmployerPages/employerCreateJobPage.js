import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import authAxios from '../../Redux/authAxios'
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import Select from 'react-select';
import background from '../../Images/forms.jpg'

const EmployerCreateJobPage = () => {
    const dispatch = useDispatch();
    const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        loadLocationThunkAction();
        loadIndustryThunkAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const locationState = useSelector((state) => state.location);

    const industryState = useSelector((state) => state.industry);





    const fillInfoToast = () => toast("Please Fill In All Information")
    const updatedToast = () => toast("Job Has Been Posted") // should be no need
    const [jobTitle, setJobTitle] = useState('')
    const [jobDes, setJobDes] = useState('')
    const [exp, setExp] = useState('')
    const [salary, setSalary] = useState('')
    const [empType, setEmpType] = useState('')
    const [jobFunctionArr, setJobFunctionArr] = useState('')
    const [location, setLocation] = useState('')
    const [workPeriod, setWorkPeriod] = useState('');
    const [salaryType, setSalaryType] = useState('')



    const history = useHistory();


    function handleOnSubmit(e) {
        e.preventDefault();
        if (!jobTitle || !jobDes || !exp || !salary || !empType || !jobFunctionArr || !location || !workPeriod) {
            fillInfoToast();
            return;
        }

        let jobFunction = jobFunctionArr.value

        erJobCreate(jobTitle, jobFunction, exp, salary,
            jobDes, workPeriod, location, empType, salaryType).then(() => {
                history.push('/employerJobRecordsList')
            })

    }

    function handleReset() {
        setJobTitle('');
        setJobDes('');
        setExp('');
        setSalary('');
        setEmpType('');
        setJobFunctionArr('');
        setLocation('');
        setWorkPeriod('');
        setSalaryType('');
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
        }).then(()=>updatedToast())
    }


    //setup industryTag
    let industryTag = []
    if (industryState.length > 0) {
        industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry })))
    }
    

    const handleOnChangeIndustry = obj => {
        setJobFunctionArr(obj)
    }

    const IndustryTag = () => (
        <Select
            defaultValue={null}
            value={jobFunctionArr}
            onChange={handleOnChangeIndustry}
            name="industry"
            options={industryTag}
            className="basic-multi-select"
            classNamePrefix="select"
            
        />
    )



    return (

        <div>
            <EmployerNavbar />
            <div >
                <div className="container-fluid mt-0" style={{ minHeight:'91vh', display: "flex", justifyContent: "center", backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${background})`, backgroundPosition:'center', backgroundSize:'cover', marginTop:"0" }}>
                    <div className="col-6" style={{border:"3px solid black",  borderRadius:"5px", padding:"30px", background:"linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))", marginTop:"50px"}}>
                    <h2 style={{textAlign:'center', fontSize:'50px', fontWeight:'Bold', textDecoration:'underline', marginBottom:'20px', color:"white"}}>Create A Job</h2>
                        <Form className="form-group" onSubmit={(e) => handleOnSubmit(e)}>
                            <FormGroup>
                                <Label style={{fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="Job Title">Job Title</Label>
                                <Input type="text" name="text" id="jobTitle" placeholder="" value={jobTitle} onChange={(e) => setJobTitle(e.target.value.toUpperCase())} />
                                <FormGroup>
                                    <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="Text">Job Description</Label>
                                    <Input type="textarea" name="text" id="intro" placeholder="" value={jobDes} onChange={(e) => setJobDes(e.target.value)} />
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="reqExp">Required Experience</Label>
                                <Input type="number" name="number" id="reqExp" placeholder="Year of Experience" value={exp} onChange={(e) => setExp(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="salaryType">Expected Salary Type </Label>
                                <Input type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                                    <option defaultValue={null}>Please select</option>
                                    <option value={'perJob'} > Per Job </option>
                                    <option value={'perHour'}> Per Hour</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="Expected Salary">Salary</Label>
                                <Input type="number" name="number" id="Salary" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="employmentType">Employment Type</Label>
                                <Input type="select" name="employmentType" id="employmentType" value={empType} onChange={(e) => setEmpType(e.target.value)}>
                                    <option defaultValue={null} >Please select</option>
                                    <option value={'Freelance'}>Freelance</option>
                                    <option value={'PartTime'}>Part-Time</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="JobFunction">Job Function</Label>
                                <IndustryTag />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="workPeriod">Work Period</Label>
                                <Input type="text" name="workPeriod" id="workPeriod" placeholder="" value={workPeriod} onChange={(e) => setWorkPeriod(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label style={{marginTop:"10px", fontWeight:"bold", fontSize:"20px", marginBottom:"10px", color:"white"}} for="preferworklocation">Work Location</Label>
                                <Input type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                                    <option defaultValue={null} >Please select</option>
                                    {locationState.length > 0 ? locationState.map((location, i) => (
                                        <option key={i} value={location.location}>{location.location}</option>
                                    )) : "loading..."}
                                </Input>
                            </FormGroup>
                            <div style={{float:"right", marginTop:'10px'}}>
                            <Button className="m-2" type="submit">Post</Button>
                            <Button className="m-2" onClick={() => handleReset()}>Reset</Button>
                            <ToastContainer />
                            </div>
                        </Form>
                    </div>

                </div>
            </div>

        </div>

    )
};

export default EmployerCreateJobPage;
