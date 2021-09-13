import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import authAxios from '../../Redux/authAxios'
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import Select from 'react-select';

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
    console.log("location", locationState)
    const industryState = useSelector((state) => state.industry);
    console.log("industry", industryState)

   


    const fillInfoToast = () => toast("Please Fill In All Information")
    const updatedToast = () => toast("Job Has Been Posted") // should be no need
    const [jobTitle, setJobTitle] = useState('')
    const [jobDes, setJobDes] = useState('')
    const [exp, setExp] = useState('')
    const [salary, setSalary] = useState('')
    const [empType, setEmpType] = useState('')
    const [jobFunction, setJobFunction] = useState('')
    const [location, setLocation] = useState('')
    const [workPeriod, setWorkPeriod] = useState('');
    const [salaryType, setSalaryType] = useState('')
    const [industryArr, setIndustryArr] = useState(null);


    const history = useHistory();


    function handleOnSubmit(e) {
        e.preventDefault();
        if (!jobTitle || !jobDes || !exp || !salary || !empType || !jobFunction || !location || !workPeriod ) {
            fillInfoToast();
            console.log('submitting')
            return;
        }
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
            setJobFunction('');
            setLocation('');
            setWorkPeriod('');
            setSalaryType('');
        }
        
        console.log('data', jobTitle, jobDes, exp, salary, empType, jobFunction, location, workPeriod, salaryType)

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
            updatedToast()
        }).catch(err => {
            console.log("job posting err res", err.response)
        })
    }

    // {industryState.length > 0 ? industryState.map((industry, i) => (
    //     <option key={i} value={industry.industry} selected>{industry.industry}</option>
    //   )) : "loading..."}
     //setup industryTag
  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry })))
  }
  console.log('industryTag', industryTag)

  const handleOnChangeIndustry = obj => {
    console.log('setIndustry', obj)
    setIndustryArr(obj)
  }

  const IndustryTag = () => (
    <Select
      defaultValue={null}
      value={industryArr}
      onChange={handleOnChangeIndustry}
      isMulti
      name="industry"
      options={industryTag}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )

    return (

        <div>
            <EmployerNavbar />
            <div className="container mt-2">
                <h2>Job Create Form</h2>
                <div className="col-6">
                    <Form className="form-group" onSubmit={(e) => handleOnSubmit(e)}>
                        <FormGroup>
                            <Label for="Job Title">Job Title</Label>
                            <Input type="text" name="text" id="jobTitle" placeholder="" value={jobTitle} onChange={(e) => setJobTitle(e.target.value.toUpperCase())} />
                            <FormGroup>
                                <Label for="Text">Job Description</Label>
                                <Input type="textarea" name="text" id="intro" placeholder="" value={jobDes} onChange={(e) => setJobDes(e.target.value)} />
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="reqExp">Required Experience</Label>
                            <Input type="number" name="number" id="reqExp" placeholder="Year of Experience" value={exp} onChange={(e) => setExp(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="salaryType">Expected Salary Type </Label>
                            <Input type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                                <option value={null} selected>Please select</option>
                                <option value={'perJob'} selected> Per Job </option>
                                <option value={'perHour'}> Per Hour</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="Expected Salary">Salary</Label>
                            <Input type="number" name="number" id="Salary" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="employmentType">Employment Type</Label>
                            <Input type="select" name="employmentType" id="employmentType" value={empType} onChange={(e) => setEmpType(e.target.value)}>
                            <option value={null} selected>Please select</option>
                                <option selected>Freelance</option>
                                <option>Part-Time</option>
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
                            <Input type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                          <option value={null} selected>Please select</option>
                          {locationState.length > 0 ? locationState.map((location, i) => (
                            <option key={i} value={location.location} selected>{location.location}</option>
                          )) : "loading..."}
                            </Input>
                        </FormGroup>
                        <Button className="m-2" type="submit">Post</Button>
                        <Button className="m-2" onClick={() => handleReset()}>Reset</Button>
                        <ToastContainer />
                    </Form>
                </div>

            </div>

        </div>

    )
};

export default EmployerCreateJobPage;