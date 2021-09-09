import React, { useState } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";

const ApplicantJobSearch = (props) => {
  const [available, setAvailable] = useState('');
  const [expSalary, setExpSalary] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [location, setLocation] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [skill, setSkill] = useState('')
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    console.log(newSearch)
    const newSearch = e.currentTarget.value;
    setSearch(newSearch);
    if (newSearch === "") {
      props.onSearchChange("");
    }
  };
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
                    <Input type="text" name="JobTitle" id="JobTitle" value={search} placeholder="Job Title" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Company">Company</Label>
                    <Input type="text" name="Company Name" id="Company" value={search} placeholder="Company" />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="ExpectedSalary">ExpectedSalary</Label>
                    <Input type="number" name="ExpectedSalary" id="ExpectedSalary" placeholder="ExpectedSalary" />
                  </FormGroup>
                </Col>
                <Col lg={12}>
              <FormGroup>
                <FormGroup>
                <Label for="salaryType">Expected Salary Type</Label>
                <Input type="select" name="salaryType" id="salaryType" value={salaryType} onChange={(e)=>setSalaryType(e.target.value)}>
                  <option value={'perJob'} selected>Per Job</option>
                  <option value={'perHour'}>Per Hour</option>
                </Input>
               </FormGroup>
               {salaryType ? (salaryType === 'perJob'? 
               (<FormGroup>
                <Input className='mt-2' type="select" name="perJobExpectedSalary" id="perJobExpectedSalary" value={expSalary} onChange={(e)=>setExpSalary(e.target.value)}>
                  <option value={2500} selected>$2500 or below</option>
                  <option value={5000}>$5000 or below</option>
                  <option value={7500}>$7500 or below</option>
                  <option value={10000}>$10000 or above</option>   
                </Input>
              </FormGroup>)
               :(<FormGroup>
                <Input className='mt-2' type="select" name="perHourExpectedSalary" id="perHourExpectedSalary" value={expSalary} onChange={(e)=>setExpSalary(e.target.value)}>
                  <option value={70} selected>$70 or below</option>
                  <option value={150}>$150 or below</option>
                  <option value={200}>$200 or below</option>
                  <option value={250}>$250 or above</option>   
                </Input>
              </FormGroup>)
               ): <p>Please select the Salary Type</p>}             
              </FormGroup>
            </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Job Function">Job Function</Label>
                    <Input type="text" name="Job Function" id="JobFunction" placeholder="Job Function" />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label for="Working Location">Working Lication</Label>
                    <Input type="text" name="Working Location" id="WorkingLocation" placeholder="Working Location" />
                  </FormGroup>
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