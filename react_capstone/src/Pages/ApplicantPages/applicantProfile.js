import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input} from 'reactstrap';
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
import PortfolioTable from "../../Components/Applicants/PortfolioTable";

const ApplicantProfile = () => {

  //toggler


  const dispatch = useDispatch();
  const { loadEEProfileThunkAction } = bindActionCreators(actionCreators, dispatch);
  const { updateEEProfileAction } = bindActionCreators(actionCreators, dispatch)
  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)


  const EEProfileState = useSelector((state) => state.EEProfile);
  console.log('EEprofile', EEProfileState)

  const skillsState = useSelector((state) => state.skills);
  console.log("skills", skillsState)

  const locationState = useSelector((state) => state.location);
  console.log("location", locationState)

  const industryState = useSelector((state) => state.industry);
  console.log("industry", industryState)

  const { ee_id, ee_name, ee_email, ee_industry, ee_img_data, ee_location, self_intro, ee_phone, expected_salary, availability, ee_exp, ee_skill, ee_salary_type } = EEProfileState

  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState(null);
  const [intro, setIntro] = useState(null);
  const [expectedSalary, setExpectedSalary] = useState(null);
  const [image, setImage] = useState(null);
  const [expYr, setExpYr] = useState(null)
  const [salaryType, setSalaryType] = useState(null);
  const [availableArr, setAvailableArr] = useState(null);
  const [industryArr, setIndustryArr] = useState(null);
  const [skillArr, setSkillArr] = useState(null)
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleContact, setToggleContact] = useState(false);
  const [toggleJobPreference, setToggleJobPreference] = useState(false);
  const [togglePortfolio, setTogglePortfolio] = useState(false);

  useEffect(() => {
    loadEEProfileThunkAction();
    
    setName(ee_name);
    setPhone(ee_phone);
    setLocation(ee_location);
    setImage(ee_img_data)
    setIntro(self_intro);
    setSalaryType(ee_salary_type)
    setExpectedSalary(expected_salary);
    setExpYr(ee_exp);
    let avaobj
    if (availability && availability.length > 0) {
      avaobj = availability.map((ava) => {
        return { 'label': ava, 'value': ava }
      })
      setAvailableArr(avaobj);
    }
    let indobj
    if (ee_industry && ee_industry.length > 0) {
      indobj = ee_industry.map((ind) => {
        return { 'label': ind, 'value': ind }
      })
      setIndustryArr(indobj);
    }
    let skyobj
    if (ee_skill && ee_skill.length > 0) {
      skyobj = ee_skill.map((sky) => {
        return { 'label': sky, 'value': sky }
      })
      setSkillArr(skyobj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ee_email, ee_exp, ee_img_data])

  useEffect(() => {
    loadSkillsThunkAction();
    loadLocationThunkAction();
    loadIndustryThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateToast = () => toast("Profile Updated");

  //setup skillsTag
  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills })))
  }
  console.log('skillsTag', skillsTag)

  const handleOnChangeSkills = obj => {
    console.log('setSkill', obj)
    setSkillArr(obj)
  }

  const SkillsTag = () => (
    <Select
      defaultValue={null}
      value={skillArr}
      onChange={handleOnChangeSkills}
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

  const handleOnChangeIndustry = obj => {
    console.log('setIndustry', obj)
    setIndustryArr(obj)
  }

  const IndustryTag = () => (
    <Select
      defaultValue={null}
      value={industryArr}
      onChange={handleOnChangeIndustry}
      isMulti
      name="industry"
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

  const handleOnChangeAvailable = obj => {
    console.log('setIndustry', obj)
    setAvailableArr(obj)
  }

  const AvailabilityTag = () => (
    <Select
      defaultValue={null}
      value={availableArr}
      onChange={handleOnChangeAvailable}
      isMulti
      name="availability"
      options={avaData}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  )


  //handle toggles 
  const aboutHandler = () => {
    setToggleAbout(true);
    setTogglePortfolio(false);
    setToggleContact(false);
    setToggleJobPreference(false);

  };
  const contactHandler = () => {
    setToggleContact(true);
    setTogglePortfolio(false);
    setToggleAbout(false);
    setToggleJobPreference(false);
  };
  const jobPreferenceHandler = () => {
    setToggleJobPreference(true);
    setTogglePortfolio(false);
    setToggleContact(false);
    setToggleAbout(false);
  };
  const portfolioHandler = () => {
    setTogglePortfolio(true);
    setToggleContact(false);
    setToggleAbout(false);
    setToggleJobPreference(false);

  };

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


    let available = null
    if (availableArr && availableArr.length > 0) {
      available = availableArr.map((arr) => {
        return arr.value
      })
    }
    console.log('available', available)

    let skill = null
    if (skillArr && skillArr.length > 0) {
      skill = skillArr.map((arr) => {
        return arr.value
      })
    }
    console.log('skill', skill)

    let industry = null
    if (industryArr && industryArr.length > 0) {
      industry = industryArr.map((arr) => {
        return arr.value
      })
    }

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
                    {/* {show ? <h1>Hello World </h1> : null} */}
                    <a class="nav-link active" id="home-tab" onClick={aboutHandler}>About</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" onClick={contactHandler}>Contact</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" onClick={jobPreferenceHandler}>Job Preferences</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" onClick={portfolioHandler}>Portfolio</a>
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
                {/* original fade cause all things disapear */}
                {/* <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> */}
                <div class="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                  {toggleAbout &&
                    <div>
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
                            <Label for="industry">Job Function</Label>
                          </div>
                          <div class="col-md-6">
                            <IndustryTag />
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
                    </div>
                  }
                  {toggleContact &&
                    <div>
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
                    </div>
                  }

                  {toggleJobPreference &&
                    <div>
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
                                <option key={i} value={location.location}>{location.location}</option>
                              )) : "loading..."}
                            </Input>
                          </div>
                        </FormGroup>
                       
                      </div>

                    </div>
                  }
                  {togglePortfolio &&
                    <div>
                      <div class="row">
                        <PortfolioTable />
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