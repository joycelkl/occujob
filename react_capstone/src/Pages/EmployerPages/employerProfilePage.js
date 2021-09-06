import React, { useEffect, useState } from "react";
import { Button, FormGroup, Label, Input} from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';

const EmployerProfilePage = () => {

  const erProfileState = useSelector((state)=> state.erProfile);
  const dispatch = useDispatch();

  const {loadErProfileThunkAction} = bindActionCreators(actionCreators, dispatch)

  useEffect(()=>{
    loadErProfileThunkAction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // tested work, Zach please map the data to display in home page
  console.log('erProfile', erProfileState[0])
  

  // const {er_id, er_email, er_img_data, er_industry, er_location, er_name, er_phone, comp_description} = erProfileState[0];

  // console.log('data',er_id, er_email, er_img_data, er_industry, er_location, er_name, er_phone, comp_description)


  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [compDescription, setCompDescription] = useState('')
  const [image, setImage] = useState('')

  //****************DONOT CHANGE THE SETTING HERE*****************************/
    // S3 setup
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: 'erUsersImg', /* further setting required at here */
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  }

  const ReactSaveImg = new S3(config);

  //the file name should be the user ID and will change later
  // const newFileName = `${er_id}.jpg`

  //***************************************************** */

  //upload image setup ***DONT MODIFY THIS PART***
  function upload (e) {
    console.log("data",e.target.files[0])
    ReactSaveImg
    .uploadFile(e.target.files[0], 'newFileName')
    .then((data) => {
        console.log(data)
        setImage(data.location)})
    .catch(err => console.error(err))
}


  return (
    <div>
      <EmployerNavbar />
      <div className="container d-flex">
        <div className="col-6 m-3">
        <FormGroup>
          <FormGroup>
          <Label for="companyName">Company Name</Label><br></br>
          <Input type="text" name="companyName" id="companyName" value={'er_name'} disabled/>
          </FormGroup>
          <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" value={'er_email'} disabled/>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input type="tel" name="phone" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number" />
          </FormGroup>
          <FormGroup>
            <Label for="compDes">Company Description</Label><br></br>
            <textarea type="text" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={compDescription} onChange={(e)=>setCompDescription(e.target.value)}> </textarea>
          </FormGroup>
          <FormGroup>
            <Label for="industry">Industry</Label>
            {/* can be replaced by Dropdown in reactstrap */}
            <select type="text" name="industry" id="companyIndustry" value={industry} onChange={(e)=>setIndustry(e.target.value)}>
              <option>HR</option>
              <option>Marketing</option>
              <option>Photography</option>
              <option>Cleaning</option>
              <option>Software Engineering</option>
            </select>
            </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <select type="select" name="location" id="officelocation" value={location} onChange={(e)=>setLocation(e.target.value)}>
              <option>Islands</option>
              <option>Kwai Tsing</option>
              <option>North</option>
              <option>Sai Kung</option>
              <option>Sha Tin</option>
            </select>
          </FormGroup>
          <Button type='submit'>Save</Button>
          </FormGroup>
        </div>
        <div className="col-6 m-3">
          <ProfileImage url={image} handleOnChange={(e)=>upload(e)}/>
        </div>
      </div>
      
    </div>

  )
};

export default EmployerProfilePage;