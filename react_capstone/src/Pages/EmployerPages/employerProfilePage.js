import React, { useState } from "react";
import { Button, FormGroup, Label, Input, Form} from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';

const EmployerProfilePage = () => {

  const dispatch = useDispatch();

  // const {loadErProfileThunkAction} = bindActionCreators(actionCreators, dispatch)
  const {updateErProfileAction} = bindActionCreators(actionCreators, dispatch)

  const erProfileState = useSelector((state) =>{console.log("ER", state.erProfile);
  return state.erProfile});
  console.log("Profile", erProfileState)
      
    const {er_id, er_email, comp_description, er_img_data, er_industry, er_location, er_name, er_phone} = erProfileState

  const [industry, setIndustry] = useState(er_industry);
  const [location, setLocation] = useState(er_location);
  const [phone, setPhone] = useState(er_phone);
  const [compDescription, setCompDescription] = useState(comp_description)
  const [image, setImage] = useState(er_img_data)
  const [name, setName] = useState(er_name)  
  const [email, setEmail] = useState(er_email)  

  // useEffect(()=>{
    
  //   console.log('industry 1',er_industry)
  //   loadErProfileThunkAction();
  //   console.log('industry 2',er_industry)
  //   setIndustry(er_industry)
  //   console.log('industry 3',er_industry)
  //   setLocation(er_location)
  //   setPhone(er_phone)
  //   setCompDescription(comp_description)
  //   setImage(er_img_data)
  //   setName(er_name)
  //   setEmail(er_email)
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [er_img_data])

 
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
  const newFileName = `${er_id}.jpg`

  //***************************************************** */

  //upload image setup ***DONT MODIFY THIS PART***
  function upload (e) {
    console.log("data",e.target.files[0])
    ReactSaveImg
    .uploadFile(e.target.files[0], newFileName)
    .then((data) => {
        console.log(data)
        setImage("")
        setImage(data.location)
      })
    .catch(err => console.error(err))
}

 function handleOnSubmit (e) {
   e.preventDefault();
   console.log('update')

   updateErProfileAction(industry, compDescription, phone, location, image)
   alert("Updated")
 }



  return (
    <div>
      <EmployerNavbar />
      <div className="container d-flex">
        <div className="col-6 m-3">
        <Form className='form-group' onSubmit={(e)=>handleOnSubmit(e)}>
          <FormGroup>
          <Label for="companyName">Company Name</Label><br></br>
          <Input type="text" name="companyName" id="companyName" value={name} onChange={(e)=>setName(e.target.value)} disabled/>
          </FormGroup>
          <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
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
            <Input type="text" name="industry" id="companyIndustry" value={industry} onChange={(e)=>setIndustry(e.target.value)}/>
            </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            {/* can be replaced by Dropdown in reactstrap */}
            <select type="select" name="location" id="officelocation" value={location} onChange={(e)=>setLocation(e.target.value)}>
              <option>Islands</option>
              <option>Kwai Tsing</option>
              <option>North</option>
              <option>Sai Kung</option>
              <option>Sha Tin</option>
            </select>
          </FormGroup>
          <Button type='submit'>Save</Button>
          </Form>
        </div>
        <div className="col-6 m-3">
          <ProfileImage url={image} handleOnChange={(e)=>upload(e)}/>
        </div>
      </div>
      
    </div>

  )
};

export default EmployerProfilePage;