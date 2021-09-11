import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../employerSearch.css";
import { useHistory } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import Select from 'react-select'


const EmployerApplicantSearch = () => {

  const dispatch = useDispatch();

  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  const {erAppSearch } = bindActionCreators(actionCreators, dispatch)


  useEffect(() => {
    loadSkillsThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

      
  const [available, setAvailable] = useState(null);
  const [expSalary, setExpSalary] = useState(null);
  const [jobFunction, setJobFunction] = useState(null);
  const [location, setLocation] = useState(null)
  const [salaryType, setSalaryType] = useState(null)
  const [workExp , setWorkExp] = useState(null)
  const [skills, setSkills] = useState(null)

  useEffect(() => {
    if (salaryType === 'Please select') {
      setSalaryType(null)
      setExpSalary(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryType])

  //setup skills tags
  const skillsState = useSelector((state) => {
    console.log("ER", state.skills);
    return state.skills
  });
  console.log("skills", skillsState)

  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills})))
  }
  console.log('skillsTag', skillsTag)

  const handleOnChangeSkills = obj =>{
    setSkills(obj)
  }

  const SkillsTag = () => (
    <Select
    defaultValue={null}
    value={skills}
    onChange={handleOnChangeSkills}
    isMulti
    name="skills"
    options={skillsTag}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
  
  //setup job function tags
  const industryState = useSelector((state) => {
    console.log("industry", state.industry);
    return state.industry
  });
  console.log("industry", industryState)

  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry})))
  }
  console.log('industryTag', industryTag)

  const handleOnChangeIndustry = obj =>{
    setJobFunction(obj)
  }

  const IndustryTag = () => (
    <Select
    defaultValue={null}
    value={jobFunction}
    onChange={handleOnChangeIndustry}
    isMulti
    name="jobFunction"
    options={industryTag}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
  
  //setup location tags
  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });
 
  console.log("location Tag Data", locationState)

  let locationTag = []
  if (locationState.length > 0) {
    locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location})))
  }

  const handleOnChangeLocation = obj =>{
    setLocation(obj)
  }

  const LocationTag = () => (
    <Select
    defaultValue={null}
    value={location}
    onChange={handleOnChangeLocation}
    isMulti
    name="location"
    options={locationTag}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
    
  //setup availability tags
  let avaData = [
    {label: "Monday",value: "monday" },
    {label: "Tuesday", value: "tuesday" ,},
    {label: "Wednesday", value: "wednesday"},
    {label: "Thursday", value: "thursday" },
    {label: "Friday",value: "friday" },
    {label: "Saturday",value: "saturday" },
    {label: "Sunday",value: "sunday" }
] 

  const handleOnChangeAvailable = obj =>{
    setAvailable(obj)
  }

  const AvailabilityTag = () => (

    <Select
    defaultValue={available}
    value={available}
    onChange={handleOnChangeAvailable}
    isMulti
    name="availability"
    options={avaData}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
  
  const history = useHistory();

  function handleOnSubmit(e) {
    e.preventDefault();
  
    console.log('submitted', available, jobFunction, expSalary, location, skills, salaryType, workExp)

    erAppSearch(available, jobFunction, expSalary, location, skills, salaryType, workExp)
      .then(() => {
        history.push('/employerApplicantSearchList')
      })

  }

  return (
    <div>
      <EmployerNavbar />
      <div className="searchHeader">
        <Container>
        <h1 className='mt-5' style={{color:'white'}}>Candidate Search</h1>
          <Form className='form-group' onSubmit={(e)=>handleOnSubmit(e)}>
            <div className="mb-3 search-text-box text-start" id="home">
              <Row form>
                <Col lg={12}>
                  <FormGroup>
                    <Label for="Availability" style={{color:"white"}}>Availability</Label>
                    <AvailabilityTag />
                  </FormGroup>
                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <FormGroup>
                      <Label for="salaryType" style={{color:"white"}} >Expected Salary Type</Label>
                      <Input type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                      <option value={null} selected>Please select</option>
                        <option value={'perJob'} >Per Job</option>
                        <option value={'perHour'}>Per Hour</option>
                      </Input>
                    </FormGroup>
                    {salaryType ? (salaryType === 'perJob' ?
                      (<FormGroup>
                        <Input className='mt-2' type="select" name="perJobExpectedSalary" id="perJobExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                        <option value={null} selected>Please select</option>
                          <option value={2500} >$2500 or below</option>
                          <option value={5000}>$5000 or below</option>
                          <option value={7500}>$7500 or below</option>
                          <option value={7501}>Above $7500</option>
                        </Input>
                      </FormGroup>)
                      : (<FormGroup>
                        <Input className='mt-2' type="select" name="perHourExpectedSalary" id="perHourExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                        <option value={null} selected>Please select</option>
                          <option value={70}>$70 or below</option>
                          <option value={150}>$150 or below</option>
                          <option value={200}>$200 or below</option>
                          <option value={201}>Above $200</option>
                        </Input>
                      </FormGroup>)
                    ) : <p>Please select the Salary Type</p>}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="requiredExp" style={{color:"white"}}>Year of Working Experience</Label>
                    <Input type="select" name="requiredExp" id="requiredExp" placeholder="requiredExp" value={workExp} onChange={(e) => setWorkExp(e.target.value)} >
                      <option value={null} selected>Please select</option>
                      <option value={2}>2 years or below</option>
                      <option value={5}>5 years or below</option>
                      <option value={6}>Above 5 years</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Job Function" style={{color:"white"}}>Job Function</Label>
                    <IndustryTag />
                  </FormGroup>
                </Col>
                <Col md={12}>

                  <FormGroup>
                    <Label for="skills" style={{color:"white"}}>Skill</Label>
                    <SkillsTag />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Working Location" style={{color:"white"}}>Work Location</Label>
                    <LocationTag />
                  </FormGroup>
                </Col>
              </Row>
              <Button className='col-1 mt-3' type='submit'>Search</Button>
            </div>
          </Form>
        </Container>
    
      </div>

    </div>
  );
}





export default EmployerApplicantSearch;