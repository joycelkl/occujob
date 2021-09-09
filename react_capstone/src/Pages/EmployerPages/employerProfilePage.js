import React, { useState, useEffect } from "react";
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';
import './employerProfilePage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployerProfilePage = () => {
  const updateToast = () => toast("Profile Updated");
  const erProfileState = useSelector((state) => {
    console.log("ER", state.erProfile);
    return state.erProfile
  });
  console.log("Profile", erProfileState)

  const dispatch = useDispatch();

  const { loadErProfileThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { updateErProfileAction } = bindActionCreators(actionCreators, dispatch)

  const { er_id, er_email, comp_description, er_img_data, er_industry, er_location, er_name, er_phone } = erProfileState

  const [industry, setIndustry] = useState(er_industry);
  const [location, setLocation] = useState(er_location);
  const [phone, setPhone] = useState(er_phone);
  const [compDescription, setCompDescription] = useState(comp_description)
  const [image, setImage] = useState(er_img_data)
  const [name, setName] = useState(er_name)
  const [email, setEmail] = useState(er_email)

  useEffect(() => {
    console.log('industry 1', er_industry)
    loadErProfileThunkAction();
    console.log('industry 2', er_industry)
    setIndustry(er_industry)
    console.log('industry 3', er_industry)
    setLocation(er_location)
    setPhone(er_phone)
    setCompDescription(comp_description)
    setImage(er_img_data)
    setName(er_name)
    setEmail(er_email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [er_img_data, image])


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
  function upload(e) {
    console.log("data", e.target.files[0])
    ReactSaveImg
      .uploadFile(e.target.files[0], newFileName)
      .then((data) => {
        console.log(data)
        setImage("")
        setImage(data.location)
      })
      .catch(err => console.error(err))
  }


  function handleOnSubmit(e) {
    e.preventDefault();
    console.log('update')

    updateErProfileAction(industry, compDescription, phone, location, image)
    updateToast()
    }

  return (
    <div>
      <EmployerNavbar />
      {/* <div className="container d-flex">
        <div className="col-6 m-3">
          <Form className='form-group' onSubmit={(e) => handleOnSubmit(e)}>
            <FormGroup>
              <Label for="companyName">Company Name</Label><br></br>
              <Input type="text" name="companyName" id="companyName" value={name} onChange={(e) => setName(e.target.value)} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
            </FormGroup>
            <FormGroup>
              <Label for="compDes">Company Description</Label><br></br>
              <Input type="textarea" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={compDescription} onChange={(e) => setCompDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="industry">Industry</Label>
              <Input type="text" name="industry" id="companyIndustry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              {/* can be replaced by Dropdown in reactstrap */}
              {/* <Input type="select" name="location" id="officelocation" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option>Islands</option>
                <option>Kwai Tsing</option>
                <option>North</option>
                <option>Sai Kung</option>
                <option>Sha Tin</option>
              </Input>
            </FormGroup> */} 
            {/* <Button type='submit'>Save</Button>
          </Form>
        </div>
        <div className="col-6 m-3">
          <ProfileImage url={image} handleOnChange={(e) => upload(e)} />
        </div>
      </div> */}
      <div class="container emp-profile">
        <Form className='form-group' onSubmit={(e) => handleOnSubmit(e)}>
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <ProfileImage url={image} handleOnChange={(e) => upload(e)} />
                <div class="file btn btn-lg btn-primary">
                  Change Photo
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">
                <FormGroup>
                  <Label for="companyName" >Company Name</Label><br></br>
                  <Input type="text" name="companyName" id="companyName" value={name} onChange={(e) => setName(e.target.value)} disabled />
                </FormGroup>
                {/* <h6>
                  Web Developer and Designer
                </h6> */}
                <p class="proile-rating">Ratings : <span>8/10</span></p>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  
                </ul>
              </div>
            </div>
        
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="profile-work">
                <p>WORK LINK</p>
                <a href="">Website Link</a><br />
                <a href="">Bootsnipp Profile</a><br />
                <a href="">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="">Web Designer</a><br />
                <a href="">Web Developer</a><br />
                <a href="">WordPress</a><br />
                <a href="">WooCommerce</a><br />
                <a href="">PHP, .Net</a><br />
              </div>
            </div>
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="email">Email</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="phone">Phone Number</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row">
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="compDes">Company Description</Label><br></br>
                      </div>
                      <div class="col-md-6">
                        <Input type="textarea" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={compDescription} onChange={(e) => setCompDescription(e.target.value)} />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="industry">Industry</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="text" name="industry" id="companyIndustry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                      </div>
                    </FormGroup>

                  </div>
                  <div class="row">
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="location">Location</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="select" name="location" id="officelocation" value={location} onChange={(e) => setLocation(e.target.value)}>
                          <option>Islands</option>
                          <option>Kwai Tsing</option>
                          <option>North</option>
                          <option>Sai Kung</option>
                          <option>Sha Tin</option>
                        </Input>
                      </div>
                    </FormGroup>

                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div class="col-md-2">
              <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Save" />
            </div>
            <ToastContainer />
        </Form>
      </div>
    </div>

  )
};

export default EmployerProfilePage;