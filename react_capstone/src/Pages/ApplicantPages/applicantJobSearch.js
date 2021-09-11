import React, { useState, useEffect, Component } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import authAxios from "../../Redux/authAxios";
import Select from 'react-select'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useHistory } from 'react-router';


const ApplicantJobSearch = (props) => {

  const dispatch = useDispatch();
  
  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });

  const industryState = useSelector((state) => {
    console.log("industry", state.industry);
    return state.industry
  });
  const companyNameState = useSelector((state) => {
    console.log("companyName", state.companyName);
    return state.companyName
  });
  
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadCompanyNameThunkAction } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    loadCompanyNameThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [jobTitleTag, setJobTitleTag] = useState([]);
  const [companyName, setCompanyName] = useState(null);
  const [jobFunction, setJobFunction] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [worklocation, setWorkLocation] = useState(null);
  const [salaryType, setSalaryType] = useState(null);
  const [expSalary, setExpSalary] = useState(null);
  const history = useHistory();


  //******* TAGS  *******8 */
   function handleOnSubmit(e) {
    e.preventDefault();
    // if(!jobTitleTag ||!companyName || !jobFunction || !jobType || !worklocation || !salaryType || !expSalary){
    //   alert('please fillin critiria')
    //   return
    // }
    console.log('submitted', jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary )

    eeJobSearch(jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary)
      .then(() => {
        console.log('redirect')
        history.push('/ApplicantJobSearchResult')
      })
   }

  async function eeJobSearch(jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary) {
    const authAxiosConfig = await authAxios();
    return await authAxiosConfig.post('/employee/search/result', {
      jobTitle:jobTitleTag, company:companyName, jobType:jobType, salaryType:salaryType, salary:expSalary, jobFunction:jobFunction, location:worklocation
    }).then(() => {
      console.log('sent')
    }).catch(err => {
      console.log("search candidate err res", err.response)
    })
  }
  
// Company Name Related Set Tag n Select
let companyNameTag = []
if (companyNameState.length > 0) {
  companyNameState.map((com) => (companyNameTag.push({"label": com.er_name, "value": com.er_name })))
}
const handleCompanyNameChange = obj => {
  setCompanyName(obj);
}
  const CompanyNameTag = () => (
    <Select
    defaultValue={companyName}
    value={companyName}
      isMulti
      name="location"
      options={companyNameTag}
      onChange={handleCompanyNameChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
// Work Location Related Set Tag n Select
  let locationTag = []
  if (locationState.length > 0) {
    locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location })))
  }
  const handleLocationChange = obj => {
    setWorkLocation(obj);
  }
  const LocationTag = () => (
    <Select
      defaultValue={worklocation}
      value={worklocation}
      isMulti
      name="location"
      options={locationTag}
      onChange={handleLocationChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
// Industry Related Set Tag n Select
let industryTag = []
if (industryState.length > 0) {
  industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry })))
}
const handleIndustryChange = obj => {
  setJobFunction(obj);
}
  const IndustryTag = () => (
    <Select
      defaultValue={jobFunction}
      value={jobFunction}
      isMulti
      name="skills"
      options={industryTag}
      onChange={handleIndustryChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )

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
                    <Label for="JobTitle" style={{ color: 'white' }}>Job Title</Label>
                    <ReactTagInput
                      tags={jobTitleTag}
                      onChange={(newTags) => setJobTitleTag(newTags)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Company" style={{ color: 'white' }}>Company</Label>
                    {/* <Input type="text" name="Company Name" id="Company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" /> */}
                    <CompanyNameTag/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="JobType" style={{ color: 'white' }}>Job Type</Label>
                    <Input type="select" name="JobType" id="JobType" value={'PartTime'} onChange={(e) => setJobType(e.target.value)}>
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
              <Button type='submit' className="search-Homebtn">
                Search</Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>

  );
}

export default ApplicantJobSearch;