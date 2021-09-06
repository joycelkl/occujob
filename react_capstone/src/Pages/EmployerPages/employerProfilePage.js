import React, { useEffect } from "react";
import { Button, FormGroup, Label, Input} from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const EmployerProfilePage = () => {

  const erProfileState = useSelector((state)=> {console.log("ERPRO", state.erProfile);return state.erProfile})
  const dispatch = useDispatch();

  const {loadErProfileThunkAction} = bindActionCreators(actionCreators, dispatch)

  useEffect(()=>{
    loadErProfileThunkAction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // tested work, Zach please map the data to display in home page
  console.log('erProfile', erProfileState && erProfileState)

  return (
    <div>
      <EmployerNavbar />
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