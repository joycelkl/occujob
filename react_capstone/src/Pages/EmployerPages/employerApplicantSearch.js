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


  const history = useHistory();

  function handleOnSubmit (e) {
    e.preventDefault();

    erAppSearch(available, jobFunction, expSalary, location)
    .then(()=>{
            console.log('redirect')
            // history.push('/employerApplicantSearchList')
        })
    
}

  async function erAppSearch (available, jobFunction, expSalary, location) {
        const authAxiosConfig = await authAxios();
    return await authAxiosConfig.post('/employer/candidateSearch', {
      available: available, jobFunction: jobFunction, expSalary: expSalary, location: location
    }).then(() => {
       console.log('sent')
    }).catch(err => {
        console.log("search candidate err res", err.response)
    })
}

  return (
    <div>
      <EmployerNavbar />
        <div className="searchHeader">
      <Container>
      <Form>
        <div className="mb-3 search-text-box" id="home">
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
                <Label for="ExpectedSalary">ExpectedSalary</Label>
                <Input type="number" name="ExpectedSalary" id="ExpectedSalary" placeholder="ExpectedSalary">
                <option>Weekdays Only</option>
                  <option>Weekends Only</option>
                  <option>Anyday</option>   
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="Job Function">Job Function</Label>
                <Input type="text" name="Job Function" id="Job Function" placeholder="Job Function" />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="Working Location">Work Location</Label>
                <Input type="text" name="Working Location" id="Working Location" placeholder="Work Location" />
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