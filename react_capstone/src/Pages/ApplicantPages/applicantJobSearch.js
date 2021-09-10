import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import authAxios from "../../Redux/authAxios";
import { useHistory } from 'react-router';

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
  const dispatch = useDispatch();

  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  useEffect(() => {
    loadSkillsThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [jobtitle, setJobtitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [jobType, setJobType] = useState('')
  const [location, setLocation] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [expSalary, setExpSalary] = useState('')
  


  return (

    <div>
      <ApplicantNavbar />
      <div className="searchHeader">
        <Container>
          <Form>
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
                    <Input type="text" name="Job Function" id="JobFunction" value={jobFunction} onChange={(e) => setJobFunction(e.target.value)}placeholder="Job Function" />
                  </FormGroup>
                </Col>
                <Col md={12}>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Working Location">Work Location</Label>
                    <Input type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                      {locationState.length > 0 ? locationState.map((location) => (
                        <option value={location.location} selected>{location.location}</option>
                      )) : "loading..."}
                    </Input>
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