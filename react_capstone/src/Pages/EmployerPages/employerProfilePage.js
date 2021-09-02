import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const EmployerProfilePage = () => {
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <Label for="">Company Name</Label><br></br>
          <Label for="Email">Email</Label>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input type="number" name="phone" id="phone" placeholder="Phone Number:" />
          </FormGroup>
          <FormGroup>
            <Label for="Text">Company Description</Label>
            <Input type="textarea" name="text" id="intro" placeholder="intro" />
          </FormGroup>
          <FormGroup>
            <Label for="preferworklocation">Industry</Label>
            <Input type="select" name="select" id="companyIndustry">
              <option>HR</option>
              <option>Marketing</option>
              <option>Photography</option>
              <option>Cleaning</option>
              <option>Software Engineering</option>
            </Input>
            <Input type="select" name="select" id="preferworklocation">
              <option>Islands</option>
              <option>Kwai Tsing</option>
              <option>North</option>
              <option>Sai Kung</option>
              <option>Sha Tin</option>
            </Input>
          </FormGroup>
        </div>
        <div className="col-4">
          <div className="card">Upload Company Logo</div>
        </div>
      </div>
      <Button>Save</Button>
    </div>

  )
};

export default EmployerProfilePage;