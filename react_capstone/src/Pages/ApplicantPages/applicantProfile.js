import React, {useEffect} from "react";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import { useDispatch,useSelector} from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const ApplicantProfile = () => {
  const EEProfileState = useSelector((state)=>state.EEProfile);
  const dispatch = useDispatch();
  const {loadEEProfileThunkAction} = bindActionCreators(actionCreators,dispatch)
  useEffect(()=>{
    loadEEProfileThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
console.log('EEProfile', EEProfileState)
return(
    <div>
      <ApplicantNavbar />
    <div className="row">
        <div className="col-6">
     <Label for="">FullName</Label><br></br>
    <Label for="Email">ee_email</Label>
    <FormGroup>
        <Label for="phone">Phone Number</Label>
        <Input type="number" name="phone" id="phone" placeholder="ee_phone"/>
      </FormGroup>
    <FormGroup>
        <Label for="Text">Self-Introduction</Label>
        <Input type="textarea" name="text" id="intro" placeholder="intro" />
      </FormGroup>
      <FormGroup>
        <Label for="Skill">Skills</Label>
        <Input type="textarea" name="text" id="Skill" placeholder="Tags" />
      </FormGroup>
      <FormGroup>
        <Label for="JobFunction">JobFunction</Label>
        <Input type="textarea" name="text" id="JobFunction" placeholder="ee_industry" />
      </FormGroup>
      <FormGroup>
        <Label for="Expected Salary">Expected Salary</Label>
        <Input type="number" name="number" id="Expected Salary" placeholder="Expected Salary" />
      </FormGroup>
      <FormGroup>
        <Label for="Availabilty">Availabilty</Label>
        <Input type="text" name="number" id="Availabilty" placeholder="Availabilty" />
      </FormGroup>
      <FormGroup>
        <Label for="preferworklocation">preferworklocation</Label>
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
          <div className="card">img place holder</div>
      </div>
      </div>
      <Button>Update</Button>
    </div>
    
)
};

export default ApplicantProfile;