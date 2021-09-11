import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';
import Select from 'react-select'
import "../EmployerPages/employerProfilePage.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ApplicantProfile = () => {

  const updateToast = () => toast("Profile Updated");

  const EEProfileState = useSelector((state) => state.EEProfile);

  const skillsState = useSelector((state) => {
    console.log("ER", state.skills);
    return state.skills
  });
  console.log("skills", skillsState)

  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });
  console.log("location", locationState)

  const industryState = useSelector((state) => {
    console.log("industry", state.industry);
    return state.industry
  });
  console.log("industry", industryState)


  //setup skillsTag
  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills })))
  }
  console.log('skillsTag', skillsTag)

  const SkillsTag = () => (
    <Select
      defaultValue={null}
      isMulti
      name="skills"
      options={skillsTag}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
  
  //setup industryTag
  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry })))
  }
  console.log('industryTag', industryTag)

  const IndustryTag = () => (
    <Select
      defaultValue={null}
      isMulti
      name="skills"
      options={industryTag}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )
  
  // setup availability tags
  let avaData = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday", },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" }
  ]

  const AvailabilityTag = () => (
    <Select
      defaultValue={null}
      isMulti
      name="availability"
      options={avaData}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )

 
  console.log('EEprofile', EEProfileState)
  const dispatch = useDispatch();
  const { loadEEProfileThunkAction } = bindActionCreators(actionCreators, dispatch);
  const { updateEEProfileAction } = bindActionCreators(actionCreators, dispatch)
  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  //   useEffect(()=>{
  //     loadEEProfileThunkAction();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const { ee_id, ee_name, ee_email, ee_industry, ee_img_data, ee_location, self_intro, ee_phone, expected_salary, availability, ee_exp, ee_skill, ee_salary_type } = EEProfileState

  const [name, setName] = useState(ee_name);
  const [industry, setIndustry] = useState(ee_industry);
  const [location, setLocation] = useState(ee_location);
  const [phone, setPhone] = useState(ee_phone);
  const [intro, setIntro] = useState(self_intro);
  const [expectedSalary, setExpectedSalary] = useState(expected_salary);
  const [available, setAvailable] = useState(availability);
  const [image, setImage] = useState(ee_img_data)
  const [expYr, setExpYr] = useState(ee_exp)
  const [skill, setSkill] = useState(ee_skill)
  const [salaryType, setSalaryType] = useState(ee_salary_type);
  // const [cv, setCV] = useState();


  useEffect(() => {
    loadEEProfileThunkAction();
    setName(ee_name);
    setIndustry(ee_industry);
    setLocation(ee_location);
    setPhone(ee_phone);
    setIntro(self_intro);
    setExpectedSalary(expected_salary);
    setAvailable(availability);
    setImage(ee_img_data)
    setExpYr(ee_exp)
    setSkill(ee_skill)
    setSalaryType(ee_salary_type)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ee_email, ee_exp, ee_img_data])

  useEffect(() => {
    loadSkillsThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  console.log('origin', ee_id, ee_name, ee_email, ee_industry, ee_img_data, ee_location, self_intro, ee_phone, expected_salary, availability, ee_exp, ee_skill)
  console.log('image', image)
  console.log('data', name, industry, location, phone, intro, expectedSalary, available, image, expYr, skill)

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
    // console.log('data', intro, phone, expectedSalary, industry, available, location, image)
    updateEEProfileAction(name, intro, phone, expectedSalary, industry, available, location, image, expYr, skill, salaryType)
    updateToast()
  }
  
  return (
    <div>
      <ApplicantNavbar />
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
                  <Label for="Name"><h1>Applicant's Name</h1></Label>
                  <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </FormGroup>
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
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="email">Email </Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="email" name="email" id="email" value={ee_email} disabled />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="phone">Phone Number</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="Text">Self-Introduction</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="textarea" name="text" id="intro" value={intro} onChange={(e) => setIntro(e.target.value)} />
                      </div>
                    </FormGroup>
                  </div>
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="Skill">Skills</Label>
                      </div>
                      <div class="col-md-6">
                        <SkillsTag />
                      </div>
                    </FormGroup>

                  </div>
                  <div class="row">
                    <FormGroup>
                      <div class="col-md-6">
                        <Label for="Skill">No. of Year of Working Experience</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="text" name="skill" id="Skill" placeholder="Tags" value={expYr} onChange={(e) => setExpYr(e.target.value)} />
                      </div>
                    </FormGroup>
                  </div>

                  <div class="row">
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="Availabilty">Availabilty</Label>
                      </div>
                      <div class="col-md-6">
                        <AvailabilityTag />
                      </div>
                    </FormGroup>

                  </div>
                  <div class="row">
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="industry">Job Function</Label>
                      </div>
                      <div class="col-md-6">
                        <IndustryTag />
                      </div>
                    </FormGroup>

                  </div>
                  <div class="col-md-6">
                    <Label for="preferworklocation">Expected Salary</Label>
                  </div>
                  <div class="row">
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="salaryType">Salary Type</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="select" name="select" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                          <option value={null} selected>Please select</option>
                          <option value={'perJob'}>Per Job</option>
                          <option value={'perHour'}>Per Hour</option>
                        </Input>
                      </div>
                    </FormGroup>

                  </div>

                  {ee_salary_type ? (
                    <div class="row">
                      <FormGroup>

                        <div class="col-md-6">
                          <Label for="Expected Salary">Expected Salary</Label>
                        </div>
                        <div class="col-md-6">
                          <Input type="number" name="number" id="Expected Salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />
                        </div>
                      </FormGroup>

                    </div>
                  ) : (salaryType ? (
                    <div class="row">
                      <FormGroup>

                        <div class="col-md-6">
                          <Label for="Expected Salary">Expected Salary</Label>
                        </div>
                        <div class="col-md-6">
                          <Input type="number" name="number" id="Expected Salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />
                        </div>
                      </FormGroup>

                    </div>
                  ) : null)}

                  <div class="row">
                    <FormGroup>

                      <div class="col-md-6">
                        <Label for="preferworklocation">Prefered Work Location</Label>
                      </div>
                      <div class="col-md-6">
                        <Input type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                          <option value={null} selected>Please select</option>
                          {locationState.length > 0 ? locationState.map((location, i) => (
                            <option key={i} value={location.location} selected>{location.location}</option>
                          )) : "loading..."}
                        </Input>

                      </div>
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2">
            <input type="submit" class="profile-edit-btn" name="btnAddMore" />
          </div>
          <ToastContainer />
        </Form>

         {/* <div class="row">

                      <Form className="form-group" onSubmit={(e)=>uploadCV(e)}>
                      <FormGroup>
                        <div class="col-md-6">
                          <Label for="uploadCV">Upload CV </Label>
                        </div>
                        <div class="col-md-6">
                          <Input type="file" name="uploadCV" />
                        <button type="submit">Upload</button>
                        </div>
                      </FormGroup>
                      </Form>
                    </div> */}
                    {/* <div class="row">
                      <FormGroup>
                        <div class="col-md-6">
                          <Label for="uploadCV">Upload CV </Label>
                        </div>
                        <div class="col-md-6">
                          <Input type="file" name="uploadCV" />
                        <button>Upload</button>
                        </div>
                      </FormGroup>
                    </div>
                    <div class="row">
                      <FormGroup>
                        <div class="col-md-6">
                          <Label for="uploadCV">Upload CV </Label>
                        </div>
                        <div class="col-md-6">
                          <Input type="file" name="uploadCV" />
                        <button>Upload</button>
                        </div>
                      </FormGroup>
                    </div> */}

        {/* <div className="col-4">
          <ProfileImage url={image} handleOnChange={(e) => upload(e)} />
        </div> */}
      </div>
    </div>


  )
};

export default ApplicantProfile;