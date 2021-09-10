import React, { useEffect, useState, Component } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ProfileImage from '../../Components/ProfileImage';
import S3 from 'react-aws-s3';
import Select from 'react-select'



const ApplicantProfile = () => {
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



  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills})))
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

  let avaData = [
    {label: "Monday",value: "monday" },
    {label: "Tuesday", value: "tuesday" ,},
    {label: "Wednesday", value: "wednesday"},
    {label: "Thursday", value: "thursday" },
    {label: "Friday",value: "friday" },
    {label: "Saturday",value: "saturday" },
    {label: "Sunday",value: "sunday" }
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

  let industryTag = []
  if (industryState.length > 0) {
    industryState.map((indus) => (industryTag.push({ "label": indus.industry, "value": indus.industry})))
  }
  console.log('industryTag', industryTag)


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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadLocationThunkAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
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
    alert("Updated Profile")
  }
  return (
    <div>
      <ApplicantNavbar />
      <div className="container d-flex">
        <div className="col-6">
          <Form className='form-group' onSubmit={(e) => handleOnSubmit(e)}>
            <FormGroup>
              <Label for="Name"><h1>Applicant's Name</h1></Label>
              <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email </Label>
              <Input type="email" name="email" id="email" value={ee_email} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Input type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="Text">Self-Introduction</Label>
              <Input type="textarea" name="text" id="intro" value={intro} onChange={(e) => setIntro(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="Skill">Skills</Label>
              <SkillsTag />
            </FormGroup>
            <FormGroup>
              <Label for="Skill">No. of Year of Working Experience</Label>
              <Input type="text" name="skill" id="Skill" placeholder="Tags" value={expYr} onChange={(e) => setExpYr(e.target.value)} />
            </FormGroup>
            <FormGroup>
            <FormGroup>
              <Label for="Availabilty">Availabilty</Label>
              <AvailabilityTag />
            </FormGroup>
              <Label for="industry">Job Function</Label>
              <IndustryTag />
            </FormGroup>
            <Label for="preferworklocation">Expected Salary</Label>
            <FormGroup>
              <Label for="salaryType">Salary Type</Label>
              <Input type="select" name="select" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value={null} selected>Please select</option>
                <option value={'perJob'}>Per Job</option>
                <option value={'perHour'}>Per Hour</option>
              </Input>
            </FormGroup>
            {ee_skill ? (
              <FormGroup>
                <Label for="Expected Salary">Expected Salary</Label>
                <Input type="number" name="number" id="Expected Salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />
              </FormGroup>
            ) : null}
            
            <FormGroup>
              <Label for="preferworklocation">Prefered Work Location</Label>
              <Input type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value={null} selected>Please select</option>
                {locationState.length > 0 ? locationState.map((location, i) => (
                  <option key={i} value={location.location} selected>{location.location}</option>
                )) : "loading..."}
              </Input>

            </FormGroup>
            <Button type='submit'>Update</Button>
          </Form>
        </div>
        <div className="col-4">
          <ProfileImage url={image} handleOnChange={(e) => upload(e)} />
        </div>
      </div>
    </div>

  )
};

export default ApplicantProfile;