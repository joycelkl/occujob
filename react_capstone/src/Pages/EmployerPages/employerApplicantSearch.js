import React, { useState, useEffect } from "react";
import { Col, Row,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";

const EmployerApplicantSearch = ()=>{
return(
  <div>
    <EmployerNavbar />
<Form>
    <div className="mb-3">
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Availability">Availability</Label>
            <Input type="text" name="Availability" id="Availability" placeholder="Availability" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="ExpectedSalary">ExpectedSalary</Label>
            <Input type="number" name="ExpectedSalary" id="ExpectedSalary" placeholder="ExpectedSalary" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="Job Function">Job Function</Label>
            <Input type="text" name="Job Function" id="Job Function" placeholder="Job Function"/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
           <Label for="Working Location">Work Location</Label>
           <Input type="text" name="Working Location" id="Working Location" placeholder="Work Location"/>
        </FormGroup>
      </Col>
      </Row>
      <Button>Search</Button>
      </div>
</Form>
</div>
  );
}





export default EmployerApplicantSearch;