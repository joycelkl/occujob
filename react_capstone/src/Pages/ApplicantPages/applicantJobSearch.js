import React, { useState, useEffect, Component } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import authAxios from "../../Redux/authAxios";
import { useHistory } from 'react-router';
import Select from 'react-select'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";


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
  const [jobTitleTag, setJobTitleTag] = useState([])


  //******* TAGS  *******8 */


  let locationTag = []
  if (locationState.length > 0) {
    locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location })))
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


  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry })))
  }
  console.log('industryTag', industryTag)

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
                    <Label for="JobTitle" style={{ color: 'white' }}>Job Title</Label>
                    <ReactTagInput
                      tags={jobTitleTag}
                      onChange={(newTags) => setJobTitleTag(newTags)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Company" style={{ color: 'white' }}>Company</Label>
                    <Input type="text" name="Company Name" id="Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="JobType" style={{ color: 'white' }}>Job Type</Label>
                    <Input type="select" name="JobType" id="JobType" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                      <option value={'PartTime'} selected>Part Time</option>
                      <option value={'Freelance'}>Freelance</option>
                    </Input>
                  </FormGroup>

                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <FormGroup>
                      <Label for="salaryType" style={{ color: 'white' }}>Expected Salary Type</Label>
                      <Input type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                        <option value={'perJob'} selected>Per Job</option>
                        <option value={'perHour'}>Per Hour</option>
                      </Input>
                    </FormGroup>
                    {salaryType ? (salaryType === 'perJob' ?
                      (<FormGroup>
                        <Input className='mt-2' type="select" name="perJobExpectedSalary" id="perJobExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                        <option value={null} selected>Please select</option>
                          <option value={1000} >$1000 or above</option>
                          <option value={2500}>$2500 or above</option>
                          <option value={5000}>$5000 or above</option>
                          <option value={7500}>$7500 or above</option>
                        </Input>
                      </FormGroup>)
                      : (<FormGroup>
                        <Input className='mt-2' type="select" name="perHourExpectedSalary" id="perHourExpectedSalary" value={expSalary} onChange={(e) => setExpSalary(e.target.value)}>
                        <option value={null} selected>Please select</option>
                          <option value={50} >$50 or above</option>
                          <option value={100}>$100 or above</option>
                          <option value={150}>$150 or above</option>
                          <option value={200}>$200 or above</option>
                        </Input>
                      </FormGroup>)
                    ) : <p>Please select the Salary Type</p>}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Job Function" style={{ color: 'white' }}>Job Function</Label>
                    <IndustryTag />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="Working Location" style={{ color: 'white' }}>Work Location</Label>
                      <LocationTag />
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