import React, { useState, useEffect } from 'react'
import { FormGroup, Label, Input, Form } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./employerProfilePage.css";
import EmployerPortfolioTable from '../../Components/EmployerPortfolioTable';

const EmployerProfilePage = () => {
  const updateToast = () => toast("Profile Updated");
  const erProfileState = useSelector((state) => {
    console.log("ER", state.erProfile);
    return state.erProfile
  });
  console.log("Profile", erProfileState)

  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });
  console.log("location", locationState)

  const dispatch = useDispatch();

  const { loadErProfileThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { updateErProfileAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)

  const { er_id, er_email, comp_description, er_img_data, er_industry, er_location, er_name, er_phone } = erProfileState

  const [industry, setIndustry] = useState(er_industry);
  const [location, setLocation] = useState(er_location);
  const [phone, setPhone] = useState(er_phone);
  const [compDescription, setCompDescription] = useState(comp_description)
  const [image, setImage] = useState(er_img_data)
  const [name, setName] = useState(er_name)
  const [email, setEmail] = useState(er_email)
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleContact, setToggleContact] = useState(false);
  

  useEffect(() => {
    loadErProfileThunkAction();
    setIndustry(er_industry)
    setLocation(er_location)
    setPhone(er_phone)
    setCompDescription(comp_description)
    setImage(er_img_data)
    setName(er_name)
    setEmail(er_email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [er_name, er_phone])

  console.log('image', image)
  useEffect(() => {
    loadLocationThunkAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //handle toggles 
  const aboutHandler = () => {
    setToggleAbout(true);
    setToggleContact(false);
    

  };
  const contactHandler = () => {
    setToggleContact(true);
    setToggleAbout(false);
    
  };
  


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
    if (e.target.files[0].size>1024*1024) {
      alert('Please upload image 1MB or below')
      return
    }
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
      <div class="container emp-profile">
        <Form className='form-group' onSubmit={(e) => handleOnSubmit(e)}>
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <ProfileImage url={image} handleOnChange={(e) => upload(e)} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="profile-head">
                <FormGroup>
                 
                  <h2>{name}</h2>
                </FormGroup>
                {/* <h6>
                  Web Developer and Designer
                </h6> */}
                <p class="proile-rating">Ratings : <span>8/10</span></p>
                <EmployerPortfolioTable aboutHandler={aboutHandler} contactHandler={contactHandler} />
              </div>
            </div>

          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="profile-work">
                <p>WORK LINK</p>
                <a href="*">Website Link</a><br />
                <a href="*">Bootsnipp Profile</a><br />
                <a href="*">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="*">Web Designer</a><br />
                <a href="*">Web Developer</a><br />
                <a href="*">WordPress</a><br />
                <a href="*">WooCommerce</a><br />
                <a href="*">PHP, .Net</a><br />
              </div>
            </div>
            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                {/* fade cause problem */}
                {/* <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> */}
                <div class="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  {toggleContact &&
                    <div>
                      <div class="row">
                        <FormGroup>
                          <div class="col-md-6">
                            <Label for="email">Email</Label>
                          </div>
                          <div class="col-md-6">
                            {/* <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled /> */}
                            <h6 style={{color:"black", marginTop:"10px"}}> {email} </h6>
                          </div>
                        </FormGroup>
                      </div>
                      <div class="row" style={{marginTop:"20px"}}>
                        <FormGroup>
                          <div class="col-md-6">
                            <Label for="phone">Phone Number</Label>
                          </div>
                          <div class="col-md-6">
                            <Input style={{marginTop:"10px"}} type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
                          </div>
                        </FormGroup>
                      </div>
                    </div>
                  }

                  {toggleAbout &&
                  <div>
                  <div class="row" >
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="compDes">Company Description</Label><br></br>
                      </div>
                      <div class="col-md-6">
                        <Input style={{marginTop:"10px"}} type="textarea" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={compDescription} onChange={(e) => setCompDescription(e.target.value)} />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row" style={{marginTop:"20px"}}>
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="industry">Industry</Label>
                      </div>
                      <div class="col-md-6">
                        <Input style={{marginTop:"10px"}} type="text" name="industry" id="companyIndustry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                      </div>
                    </FormGroup>

                  </div>
                  <div class="row" style={{marginTop:"20px"}}>
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="location">Location</Label>
                      </div>
                      <div class="col-md-6">
                        <Input style={{marginTop:"10px"}} type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                          <option value={null} selected>Please select</option>
                          {locationState.length > 0 ? locationState.map((location, i) => (
                            <option key={i} value={location.location}>{location.location}</option>
                          )) : "loading..."}
                        </Input>
                      </div>
                    </FormGroup>

                  </div>
                  </div>
}
                </div>

              </div>
            </div>
          </div>
          <div class="col-md-2">
            <input type="submit" class="profile-edit-btn" name="btnAddMore" />
          </div>
          <ToastContainer />
        </Form>
      </div>
    </div>

  )
}


export default EmployerProfilePage;