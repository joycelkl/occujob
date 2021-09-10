import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../employerSearch.css";
import authAxios from "../../Redux/authAxios";
import { useHistory } from 'react-router';
import { TagPicker } from 'rsuite';
import Select from 'react-select'



const EmployerApplicantSearch = () => {

  const skillsState = useSelector((state) => {
    console.log("ER", state.skills);
    return state.skills
  });
  console.log("skills", skillsState)

  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });
 
  console.log("location Tag Data", locationState)

  const industryState = useSelector((state) => {
    console.log("industry", state.industry);
    return state.industry
  });
  console.log("industry", industryState)

  const dispatch = useDispatch();

  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)

  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills})))
  }
  console.log('skillsTag', skillsTag)

  const SkillsTag = () => (
    <Select
    defaultValue={null}
    isMulti
    name="skills"
    options={skillsTag}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
  const IndustryTag = () => (
    <Select
    defaultValue={null}
    isMulti
    name="skills"
    options={industryTag}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )

  let avaData = [
    {label: "Monday",value: "monday" },
    {label: "Tuesday", value: "tuesday" ,},
    {label: "Wednesday", value: "wednesday"},
    {label: "Thursday", value: "thursday" },
    {label: "Friday",value: "friday" },
    {label: "Saturday",value: "saturday" },
    {label: "Sunday",value: "sunday" }
] 

  const AvailabilityTag = () => (
    <Select
    defaultValue={null}
    isMulti
    name="availability"
    options={avaData}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )

  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry})))
  }
  console.log('industryTag', industryTag)


  let locationTag = []
  if (locationState.length > 0) {
    locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location})))
  }

  const LocationTag = () => (
    <Select
    defaultValue={null}
    isMulti
    name="location"
    options={locationTag}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
  const [available, setAvailable] = useState('');
  const [expSalary, setExpSalary] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [location, setLocation] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [workExp , setWorkExp] = useState('')
  const [skills, setSkills] = useState('')

  useEffect(() => {
    loadSkillsThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const history = useHistory();

  function handleOnSubmit(e) {
    e.preventDefault();
    if(!available || !jobFunction || !expSalary || !location || !skills || !salaryType || !workExp){
      alert('please fillin critiria')
      return
    }
    console.log('submitted', available, jobFunction, expSalary, location, skills, salaryType, workExp)

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
  console.log('salary Type', salaryType)
  console.log('expSalary', expSalary)


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
                      <option value={null}>Please select</option>
                        <option value={'perJob'} selected>Per Job</option>
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