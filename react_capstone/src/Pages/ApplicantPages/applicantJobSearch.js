import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import authAxios from "../../Redux/authAxios";
import 'rsuite/dist/styles/rsuite-default.css';
import { TagPicker } from 'rsuite';

const ApplicantJobSearch = (props) => {
  const skillsState = useSelector((state) => {
    console.log("ER", state.skills);
    return state.skills
  });
  
  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });

  const industryState = useSelector((state) => {
    console.log("industry", state.industry);
    return state.industry
  });
  const applicantJobState = useSelector((state) => state.applicantJob)
  const dispatch = useDispatch();

  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadApplicantJobThunkAction } = bindActionCreators(actionCreators, dispatch)
  console.log('ApplicantJobSearchData', applicantJobState)
  console.log("test test",locationState)
  useEffect(() => {
    loadSkillsThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();
    loadApplicantJobThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [jobtitle, setJobtitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [jobType, setJobType] = useState('')
  const [worklocation, setworkLocation] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [expSalary, setExpSalary] = useState('')
  const [available, setAvailable] = useState('')

  const industies =[]
  if (industryState.length>0){
    industryState.map((ind)=>(industies.push({"label":ind.industry,"value":ind.industry,"role":"master"})))}
  const district = []
  if (locationState.length>0){
  locationState.map((loc)=>(district.push({"label":loc.location,"value":loc.location,"role":"master"})))}
const companyNameLoad =[]
const jobFunctionLoad =[]
if (applicantJobState.length>0){
  applicantJobState.map((job)=>(companyNameLoad.push({"label":job.er_name,"value":job.er_name,"role":"master"})))
  applicantJobState.map((job)=>(jobFunctionLoad.push({"label":job.job_title,"value":job.job_title,"role":"master"})))}

  console.log("puting in array",companyNameLoad,jobFunctionLoad)

  function handleOnSubmit(e) {
    e.preventDefault();
    if(!available || !jobFunction || !expSalary || !worklocation || !salaryType){
      alert('please fillin critiria')
      return
    }
    console.log('submitted', available, jobFunction, expSalary, worklocation, salaryType)

    // erAppSearch(available, jobFunction, expSalary, location, skills, salaryType, workExp)
    //   .then(() => {
    //     console.log('redirect')
    //     // history.push('/employerApplicantSearchList')
    //   })

  }

  async function erAppSearch(available, jobFunction, expSalary, location,  skills, salaryType, workExp) {
    const authAxiosConfig = await authAxios();
    return await authAxiosConfig.post('/employer/candidateSearch', {
      available: available, jobFunction: jobFunction, expSalary: expSalary, location: location, salaryType: salaryType, skills: skills, workExp: workExp
    }).then(() => {
      console.log('sent')
    }).catch(err => {
      console.log("search candidate err res", err.response)
    })
  }


  return (

    <div>
      <ApplicantNavbar />
      <div className="searchHeader">
        <Container>
          <Form className='form-group' onSubmit={(e)=>handleOnSubmit(e)}>
            <div className="mb-3 search-text-box" id="home">
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="JobTitle">Job Title</Label>
                    <Input type="text" name="JobTitle" id="JobTitle" value={jobtitle} onChange={(e) => setJobtitle(e.target.value)} placeholder="Job Title" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Company">Company</Label>
                    <Input type="text" name="Company Name" id="Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
                  </FormGroup>
                  <FormGroup>
                      <Label for="JobType">Job Type</Label>
                      <Input type="select" name="JobType" id="JobType" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                        <option value={'PartTime'} selected>Part Time</option>
                        <option value={'Freelance'}>Freelance</option>
                      </Input>
                    </FormGroup>

                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <FormGroup>
                      <Label for="salaryType">Expected Salary Type</Label>
                      <Input type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                        <option value={'perJob'} selected>Per Job</option>
                        <option value={'perHour'}>Per Hour</option>
                      </Input>
                    </FormGroup>
                    {salaryType ? (salaryType === 'perJob' ?
                      (<FormGroup>
                        <Input className='mt-2' type="select" name="perJobExpectedSalary" id="perJobExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                          <option value={2500} selected>$2500 or below</option>
                          <option value={5000}>$5000 or below</option>
                          <option value={7500}>$7500 or below</option>
                          <option value={10000}>$10000 or above</option>
                        </Input>
                      </FormGroup>)
                      : (<FormGroup>
                        <Input className='mt-2' type="select" name="perHourExpectedSalary" id="perHourExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                          <option value={70} selected>$70 or below</option>
                          <option value={150}>$150 or below</option>
                          <option value={200}>$200 or below</option>
                          <option value={250}>$250 or above</option>
                        </Input>
                      </FormGroup>)
                    ) : <p>Please select the Salary Type</p>}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Job Function">Job Function</Label>
                    <TagPicker data={industies} style={{ width: 800 }}/>
                  </FormGroup>
                </Col>
                <Col md={12}>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Working Location">Work Location</Label>
                         
                    <TagPicker data={district} style={{ width: 800 }}/>
                  </FormGroup>
                </Col>
                </Col>
              </Row>
              <Button onClick={() => props.onSearchChange()} className="search-Homebtn">
                Search</Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>

  );
}

export default ApplicantJobSearch;