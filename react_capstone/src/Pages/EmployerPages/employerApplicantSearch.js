import React, { useState } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../employerSearch.css";
import authAxios from "../../Redux/authAxios";
import { useHistory } from 'react-router';

const EmployerApplicantSearch = () => {

  const [available, setAvailable] = useState('');
  const [expSalary, setExpSalary] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [location, setLocation] = useState('')
  const [salaryType, setSalaryType] = useState('')
  const [skill, setSkill] = useState('')


  const history = useHistory();

  function handleOnSubmit (e) {
    e.preventDefault();

    erAppSearch(available, jobFunction, expSalary, location, skill, salaryType)
    .then(()=>{
            console.log('redirect')
            // history.push('/employerApplicantSearchList')
        })
    
}

  async function erAppSearch (available, jobFunction, expSalary, location, skill, salaryType) {
        const authAxiosConfig = await authAxios();
    return await authAxiosConfig.post('/employer/candidateSearch', {
      available: available, jobFunction: jobFunction, expSalary: expSalary, location: location, skill:skill , salaryType: salaryType
    }).then(() => {
       console.log('sent')
    }).catch(err => {
        console.log("search candidate err res", err.response)
    })
}
 console.log('salary Type',salaryType)
 console.log('expSalary', expSalary)


  return (
    <div>
      <EmployerNavbar />
        <div className="searchHeader">
      <Container>
      <Form>
        <div className="mb-3 search-text-box text-start" id="home">
          <Row form>
            <Col lg={12}>
              <FormGroup>
                <Label for="Availability">Availability</Label>
                <Input type="select" name="Availability" id="Availability" placeholder="Availability" value={available} onChange={(e)=>setAvailable(e.target.value)} >
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
                <Label for="Job Function">With Experience</Label>
                <Input type="select" name="Job Function" id="Job Function" placeholder="Job Function" value={jobFunction} onChange={(e)=>setExpSalary(e.target.value)} >
                  <option value={0} selected>Nil</option>
                  <option value={2}>2 years or below</option>
                  <option value={5}>5 years or below</option>
                  <option value={8}>8 years or above</option>   
                  </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="Job Function">Job Function</Label>
                <Input type="select" name="Job Function" id="Job Function" placeholder="Job Function" value={jobFunction} onChange={(e)=>setExpSalary(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="Job Function">Skill</Label>
                <Input type="select" name="Job Function" id="Job Function" placeholder="Job Function" value={skill} onChange={(e)=>setSkill(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="Working Location">Work Location</Label>
                <Input type="text" name="Working Location" id="Working Location" placeholder="Work Location" />
              </FormGroup>
            </Col>
            <Col md={12}>
                  <FormGroup>
                    <Label for="JobType">JobType</Label>
                    <Input type="text" name="JobType" id="WorkingLocation" placeholder="Working Location" />
                  </FormGroup>
                </Col>
          </Row>
          <a href="/employerApplicantSearchList" className="search-Homebtn">Search</a>
        </div>
      </Form>
      </Container>

      
      </div>
      
    </div>
  );
}





export default EmployerApplicantSearch;