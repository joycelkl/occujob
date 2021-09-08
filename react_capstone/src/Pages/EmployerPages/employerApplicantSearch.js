import React, { useState } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../employerSearch.css";

const EmployerApplicantSearch = () => {

  const [available, setAvailable] = useState('');
  const [expSalary, setExpSalary] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [location, setLocation] = useState('')

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
                <Input type="select" name="Availability" id="Availability" placeholder="Availability" >

                </Input>
              </FormGroup>
            </Col>
            <Col lg={12}>
              <FormGroup>
                <Label for="ExpectedSalary">ExpectedSalary</Label>
                <Input type="number" name="ExpectedSalary" id="ExpectedSalary" placeholder="ExpectedSalary" />
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