import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../employerSearch.css";
import authAxios from "../../Redux/authAxios";
import { useHistory } from 'react-router';


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
  console.log("location", locationState)

  const industryState = useSelector((state) => {
    console.log("industry", state.industry);
    return state.industry
  });
  console.log("industry", industryState)

  const dispatch = useDispatch();

  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)


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
                    <Label for="Availability">Availability</Label>
                    <Input type="select" name="Availability" id="Availability" placeholder="Availability" value={available} onChange={(e) => setAvailable(e.target.value)} >
                    <option value={null} selected>Please select</option>
                      <option>Weekdays Only</option>
                      <option>Weekends Only</option>
                      <option>Anyday</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <FormGroup>
                      <Label for="salaryType">Expected Salary Type</Label>
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
                    <Label for="requiredExp">Year of Working Experience</Label>
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
                    <Label for="Job Function">Job Function</Label>
                    <Input type="select" name="Job Function" id="Job Function" placeholder="Job Function" value={jobFunction} onChange={(e) => setJobFunction(e.target.value)}>
                      <option value={null} selected>Please select</option>
                      {industryState.length > 0 ? industryState.map((industry) => (
                        <option key={industry.industry_id} value={industry.industry} selected>{industry.industry}</option>
                      )) : "loading..."}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>

                  <FormGroup>
                    <Label for="skills">Skill</Label>
                    <Input type="select" name="skills" id="skills" placeholder="skills" value={skills} onChange={(e) => setSkills(e.target.value)}>
                    <option value={null} selected>Please select</option>
                      {skillsState.length > 0 ? skillsState.map((skill) => (
                        <option key={skill.skills_id} value={skill.skills} selected>{skill.skills}</option>
                      )) : "loading..."}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Working Location">Work Location</Label>
                    <Input type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value={null} selected>Please select</option>
                      {locationState.length > 0 ? locationState.map((location) => (
                        <option key={location.location_id} value={location.location} selected>{location.location}</option>
                      )) : "loading..."}
                    </Input>
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