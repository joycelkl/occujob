import React, { useState } from "react";
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import "../employerSearch.css";

const ApplicantJobSearch = (props) => {
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
                    <Label for="JobTitle">Job Title/Company</Label>
                    <Input type="text" name="JobTitle" id="JobTitle" value={search} placeholder="Job Title/Company" />
                  </FormGroup>
                </Col>
                <Col md={12}>
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