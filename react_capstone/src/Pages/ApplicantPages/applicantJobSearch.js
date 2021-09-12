import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../Redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select'
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useHistory } from 'react-router';


const ApplicantJobSearch = () => {

  const dispatch = useDispatch();

  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadCompanyNameThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { appJobSearch } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    loadCompanyNameThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [jobTitleTag, setJobTitleTag] = useState([]);
  const [companyNameArr, setCompanyNameArr] = useState(null);
  const [jobFunctionArr, setJobFunctionArr] = useState(null);
  const [worklocationArr, setWorkLocationArr] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [salaryType, setSalaryType] = useState(null);
  const [expSalary, setExpSalary] = useState(null);

  useEffect(() => {
    if (salaryType === 'Please select') {
      setSalaryType(null)
      setExpSalary(null)
    }
  }, [salaryType])
  
  // Work Location Related Set Tag n Select
  const locationState = useSelector((state) => state.location);

  let locationTag = []
  if (locationState.length > 0) {
    locationState.map((loc) => (locationTag.push({ "label": loc.location, "value": loc.location })))
  }
  const handleLocationChange = obj => {
    setWorkLocationArr(obj);
  }
  const LocationTag = () => (
    <Select
      defaultValue={null}
      value={worklocationArr}
      isMulti
      name="location"
      options={locationTag}
      onChange={handleLocationChange}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )

    // Industry Related Set Tag n Select
  const industryState = useSelector((state) => state.industry);

  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry })))
  }
  const handleIndustryChange = obj => {
    setJobFunctionArr(obj);
  }
    const IndustryTag = () => (
      <Select
        defaultValue={null}
        value={jobFunctionArr}
        isMulti
        name="skills"
        options={industryTag}
        onChange={handleIndustryChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    )

    // Company Name Related Set Tag n Select
  const companyNameState = useSelector((state) =>  state.companyName);  

  let companyNameTag = []
  if (companyNameState.length > 0) {
    companyNameState.map((com) => (companyNameTag.push({"label": com.er_name, "value": com.er_name })))
  }
  const handleCompanyNameChange = obj => {
    setCompanyNameArr(obj);
  }
    const CompanyNameTag = () => (
      <Select
        defaultValue={null}
        value={companyNameArr}
        isMulti
        name="location"
        options={companyNameTag}
        onChange={handleCompanyNameChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    )
 
  const history = useHistory();

  //******* TAGS  *******8 */
   function handleOnSubmit(e) {
    e.preventDefault();
    if (salaryType !== null && expSalary == null){
      alert('please select salary amount')
      return
  }
    if ((jobTitleTag.length > 3) || (companyNameArr && companyNameArr.length > 3) || (jobFunctionArr && jobFunctionArr.length >3) || (worklocationArr && worklocationArr.length > 3)){
      alert('Maximum 3 options allowed')
      return
    }

    let companyName
    if (companyNameArr && companyNameArr.length > 0) {
      companyName= companyNameArr.map((arr) => {
        return arr.value
      })
    } else {
      companyName = null;
    }
    console.log('companyName', companyName)

    let jobFunction
    if (jobFunctionArr && jobFunctionArr.length > 0) {
      jobFunction= jobFunctionArr.map((arr) => {
        return arr.value
      })
    } else {
      jobFunction = null;
    }
    console.log('jobFunction', jobFunction)

    let worklocation
    if (worklocationArr && worklocationArr.length > 0) {
      worklocation= worklocationArr.map((arr) => {
        return arr.value
      })
    } else {
      worklocation = null;
    }
    console.log('worklocation', worklocation)
    
    console.log('submitted', jobTitleTag, companyNameArr, jobFunctionArr,jobType,worklocationArr, salaryType,expSalary )

    appJobSearch(jobTitleTag, companyName, jobFunction,jobType,worklocation, salaryType,expSalary)
      .then(() => {
        history.push('/ApplicantJobSearchResult')
      })
   }
  

  return (

    <div>
      <ApplicantNavbar />
      <div className="searchHeader">
        <Container>
          <h1 style={{color:'white'}}>Job Search</h1>
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
                        <option value={null} selected>Please select</option>
                        <option value={'perJob'}>Per Job</option>
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