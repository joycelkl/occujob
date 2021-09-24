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

      
  const [expSalary, setExpSalary] = useState('');
  const [salaryType, setSalaryType] = useState('')
  const [workExp , setWorkExp] = useState('')
  const [jobFunctionArr, setJobFunctionArr] = useState('');
  const [locationArr, setLocationArr] = useState('')
  const [availableArr, setAvailableArr] = useState('');
  const [skillsArr, setSkillsArr] = useState('')
 

  useEffect(() => {
    if (salaryType === 'Please select') {
      setSalaryType(null)
      setExpSalary(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryType])

  //setup skills tags
  const skillsState = useSelector((state) => {
    return state.skills
  });


  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills})))
  }


  const handleOnChangeSkills = obj =>{

    setSkillsArr(obj)
  }

  const SkillsTag = () => (
    <Select
    defaultValue={null}
    value={skillsArr}
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

    return state.industry
  });


  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry})))
  }


  const handleOnChangeIndustry = obj =>{

    setJobFunctionArr(obj)
  }

  const IndustryTag = () => (
    <Select
    defaultValue={null}
    value={jobFunctionArr}
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

    return state.location
  });
 


  let locationTag = []
  if (locationState.length > 0) {
    locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location})))
  }

  const handleOnChangeLocation = obj =>{

    setLocationArr(obj)
  }

  const LocationTag = () => (
    <Select
    defaultValue={null}
    value={locationArr}
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

    setAvailableArr(obj)
  }

  const AvailabilityTag = () => (

    <Select
    defaultValue={null}
    value={availableArr}
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
    if ((availableArr && availableArr.length > 3) || (jobFunctionArr && jobFunctionArr.length > 3) || (skillsArr && skillsArr.length >3) || (locationArr && locationArr.length > 3)){
      alert('Maximum 3 options allowed')
      return
    }

    if (salaryType !== null && expSalary == null){
        alert('please select salary amount')
        return
    }

    let available
    if (availableArr && availableArr.length > 0) {
      available= availableArr.map((arr) => {
        return arr.value
      })
    } else {
      available = null;
    }

    
    let jobFunction
    if (jobFunctionArr && jobFunctionArr.length > 0) {
      jobFunction= jobFunctionArr.map((arr) => {
        return arr.value
      })
    } else {
      jobFunction = null;
    }
 

    let skills
    if (skillsArr && skillsArr.length > 0) {
      skills= skillsArr.map((arr) => {
        return arr.value
      })
    } else {
      skills = null;
    }


    let location
    if (locationArr && locationArr.length > 0) {
      location= locationArr.map((arr) => {
        return arr.value
      })
    } else {
      location = null;
    }

    const searchObject = {available, jobFunction, expSalary, location, skills, salaryType, workExp}
    
    localStorage.setItem('appSearch', JSON.stringify(searchObject))

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
        <Row><h1 className='mt-5 ' style={{color:'white', textAlign:'center', marginTop:'30px', fontSize:'50px', fontWeight:'Bold', textDecoration:'underline', height:'60px',zIndex:'9999' }}>Applicant Search</h1></Row>
          <Form className='form-group' onSubmit={(e)=>handleOnSubmit(e)}>
            <div className="mb-3  text-start" id="home">
              <Row>
                <Col lg={6}>
                  <FormGroup>
                    <Label for="Availability" style={{color:"white"}}>Availability</Label>
                    <AvailabilityTag />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <FormGroup>
                      <Label for="salaryType" style={{color:"white"}} >Expected Salary Type</Label>
                      <Input style={{height:"65px"}} type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                      <option defaultValue={null}>Please select</option>
                        <option value={'perJob'} >Per Job</option>
                        <option value={'perHour'}>Per Hour</option>
                      </Input>
                    </FormGroup>
                    {salaryType ? (salaryType === 'perJob' ?
                      (<FormGroup>
                        <Input className='mt-2' style={{height:"65px"}} type="select" name="perJobExpectedSalary" id="perJobExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                        <option defaultValue={null}>Please select</option>
                          <option value={2500} >$2500 or below</option>
                          <option value={5000}>$5000 or below</option>
                          <option value={7500}>$7500 or below</option>
                          <option value={7501}>Above $7500</option>
                        </Input>
                      </FormGroup>)
                      : (<FormGroup>
                        <Input className='mt-2' style={{height:"65px"}} type="select" name="perHourExpectedSalary" id="perHourExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                        <option defaultValue={null}>Please select</option>
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
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="requiredExp" style={{color:"white"}}>Year of Working Experience</Label>
                    <Input type="select" style={{height:"65px"}} name="requiredExp" id="requiredExp" placeholder="requiredExp" value={workExp} onChange={(e) => setWorkExp(e.target.value)} >
                      <option defaultValue={null}>Please select</option>
                      <option value={2}>2 years or below</option>
                      <option value={5}>5 years or below</option>
                      <option value={6}>Above 5 years</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Job Function" style={{color:"white"}}>Job Function</Label>
                    <IndustryTag />
                  </FormGroup>
                </Col>
                <Col md={6}>

                  <FormGroup>
                    <Label for="skills" style={{color:"white"}}>Skill</Label>
                    <SkillsTag />
                  </FormGroup>
                </Col>
                <Col md={6}>
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