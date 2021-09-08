import React, {useEffect, useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import { useDispatch,useSelector} from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';

const ApplicantProfile = () => {
  const EEProfileState = useSelector((state)=>state.EEProfile);
  const dispatch = useDispatch();
  const {loadEEProfileThunkAction} = bindActionCreators(actionCreators,dispatch);
  const {updateEEProfileAction} = bindActionCreators(actionCreators, dispatch)
  useEffect(()=>{
    loadEEProfileThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const {ee_id,ee_name,ee_email,ee_industry,ee_img_data,ee_location,self_intro,ee_phone,expected_salary,availability}=EEProfileState[0] || {}

const [industry, setIndustry] = useState(ee_industry );
  const [location, setLocation] = useState(ee_location);
  const [phone, setPhone] = useState(ee_phone);
  const [intro, setIntro] = useState(self_intro);
  const [expectedSalary, setExpectedSalary] = useState(expected_salary);
  const [available, setAvailable] = useState(availability);
  const [image, setImage] = useState(ee_img_data)

console.log(industry,intro,expectedSalary)
//****************DONOT CHANGE THE SETTING HERE*****************************/
    // S3 setup
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: 'eeUsersImg', /* further setting required at here */
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  }

  const ReactSaveImg = new S3(config);

  //the file name should be the user ID and will change later
  const newFileName = `${ee_id}.jpg`

  //***************************************************** */

  //upload image setup ***DONT MODIFY THIS PART***
  function upload (e) {
    console.log("data",e.target.files[0])
    ReactSaveImg
    .uploadFile(e.target.files[0], newFileName)
    .then((data) => {
        console.log(data)
        setImage(data.location)})
    .catch(err => console.error(err))
}

function handleOnSubmit (e) {
  e.preventDefault();
  console.log('update')
  // console.log('data', intro, phone, expectedSalary, industry, available, location, image)
  updateEEProfileAction(intro, phone, expectedSalary, industry, available, location, image)
  alert("Updated Profile")
}
return(
    <div>
      <ApplicantNavbar />
    <div className="container d-flex">
    <div className="col-6">
    <Form className='form-group' onSubmit={(e)=>handleOnSubmit(e)}>
     <Label for="Name"><h1>{ee_name}</h1></Label><br></br>
     <Label for="phone">Email </Label><br></br>
     <Label for="Email">{ee_email}</Label>
    <FormGroup>
        <Label for="phone">Phone Number</Label>
        <Input type="number" name="phone" id="phone" value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
      </FormGroup>
    <FormGroup>
        <Label for="Text">Self-Introduction</Label>
      <Input type="textarea" name="text" id="intro" value={intro}  onChange={(e)=>setIntro(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="Skill">Skills</Label>
        <Input type="textarea" name="text" id="Skill" placeholder="Tags" />
      </FormGroup>
      <FormGroup>
        <Label for="industry">Job Function</Label>
     <Input type="text" name="industry" id="industry" value={industry}  onChange={(e)=>setIndustry(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="Expected Salary">Expected Salary</Label>
      <Input type="number" name="number" id="Expected Salary" value={expectedSalary}  onChange={(e)=>setExpectedSalary(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="Availabilty">Availabilty</Label>
        <Input type="text" name="number" id="Availabilty"  value={available} onChange={(e)=>setAvailable(e.target.value)}/>
      </FormGroup>
      <FormGroup>
        <Label for="preferworklocation">preferworklocation</Label>
        <Input type="select" name="select" id="preferworklocation" value={location} onChange={(e)=>setLocation(e.target.value)}>
        <option>{ee_location}</option>
          <option>Islands</option>
          <option>Kwai Tsing</option>
          <option>North</option>
          <option>Sai Kung</option>
          <option>Sha Tin</option>
        </Input>
      </FormGroup>
      <Button type='submit'>Update</Button>
      </Form>
      </div>
      <div className="col-4">
      <ProfileImage url={image} handleOnChange={(e)=>upload(e)}/>
      </div>
    </div>
    </div>
    
)
};

export default ApplicantProfile;