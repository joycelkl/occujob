import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";

const ApplicantJobSearch = () => {
  return (
    <Form>
      <div>
        <ApplicantNavbar />
        <div className="mb-3">
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="JobTitle">Job Title/Company</Label>
                <Input type="text" name="JobTitle" id="JobTitle" placeholder="Job Title/Company" />
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
                <Input type="text" name="Job Function" id="Job Function" placeholder="Job Function" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Working Location">Job Function</Label>
                <Input type="text" name="Working Location" id="Working Location" placeholder="Working Location" />
              </FormGroup>
            </Col>
          </Row>
          <Button>Search</Button>
        </div>
      </div>
    </Form>
  );
}





export default ApplicantJobSearch;