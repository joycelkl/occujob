import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input } from 'reactstrap';
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
import ApplicantPortfolioTable from "../../Components/PortfolioTable";
import DisabledRating from "../../Components/Rating/DisabledRating";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ApplicantProfile = () => {

  //comment card
  const useStyles = makeStyles({
    root: {
      maxWidth: 1000,
    },
    media: {
      height: 170,
    },
  });

  const classes = useStyles();


  const [currentPage, setCurrentPage] = useState(0);
  function handleClick(e, index) {

    e.preventDefault();
    setCurrentPage(index)

  }

  const dispatch = useDispatch();
  const { loadEEProfileThunkAction } = bindActionCreators(actionCreators, dispatch);
  const { updateEEProfileAction } = bindActionCreators(actionCreators, dispatch)
  const { loadSkillsThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { loadIndustryThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { applicantGetRatingThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { applicantCreatedRatingThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { updateApplicantCreatedRatingThunkAction } = bindActionCreators(actionCreators, dispatch)
  

  const applicantCreatedRatingState = useSelector((state) => state.applicantCreatedRating)

  const applicantRatingState = useSelector((state) => state.applicantRating)

  const EEProfileState = useSelector((state) => state.EEProfile);

  const skillsState = useSelector((state) => state.skills);

  const locationState = useSelector((state) => state.location);

  const industryState = useSelector((state) => state.industry);

  const { ee_id, ee_name, ee_email, ee_industry, ee_img_data, ee_location, self_intro, ee_phone, expected_salary, availability, ee_exp, ee_skill, ee_salary_type } = EEProfileState

  // Rating
  const averageRating = applicantRatingState.length > 0 && applicantRatingState.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / applicantRatingState.length;


  let pageSize = 3;
  let pagesCount = applicantRatingState.length > 0 && Math.ceil(applicantRatingState.length / pageSize);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [intro, setIntro] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [image, setImage] = useState('');
  const [expYr, setExpYr] = useState('')
  const [salaryType, setSalaryType] = useState('');
  const [availableArr, setAvailableArr] = useState('');
  const [industryArr, setIndustryArr] = useState('');
  const [skillArr, setSkillArr] = useState('')
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleContact, setToggleContact] = useState(false);
  const [toggleJobPreference, setToggleJobPreference] = useState(false);
  const [togglePortfolio, setTogglePortfolio] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleApplicantReviews, setToggleApplicantReviews] = useState(false);
  const [comments, setComment] = useState('');

  useEffect(() => {
    loadEEProfileThunkAction();
    setName(ee_name);

    ee_phone !== null && setPhone(ee_phone);
    ee_location !== null && setLocation(ee_location);
    ee_img_data !== null && setImage(ee_img_data)
    self_intro !== null && setIntro(self_intro);
    ee_salary_type !== null && setSalaryType(ee_salary_type)
    expected_salary !== null && setExpectedSalary(expected_salary);
    ee_exp !== null && setExpYr(ee_exp);
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
    applicantGetRatingThunkAction();
    applicantCreatedRatingThunkAction();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const updateToast = () => toast("Profile Updated");
  const updateReviewToast = () => toast("Review Has Been Updated");

  //setup skillsTag
  let skillsTag = []
  if (skillsState.length > 0) {
    skillsState.map((ski) => (skillsTag.push({ "label": ski.skills, "value": ski.skills })))
  }
  

  const handleOnChangeSkills = obj => {
    
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


  const handleOnChangeIndustry = obj => {
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
    setToggleComments(false);
    setToggleApplicantReviews(false);


  };
  const contactHandler = () => {
    setToggleContact(true);
    setTogglePortfolio(false);
    setToggleAbout(false);
    setToggleJobPreference(false);
    setToggleComments(false);
    setToggleApplicantReviews(false);

  };
  const jobPreferenceHandler = () => {
    setToggleJobPreference(true);
    setTogglePortfolio(false);
    setToggleContact(false);
    setToggleAbout(false);
    setToggleComments(false);
    setToggleApplicantReviews(false);

  };
  const portfolioHandler = () => {
    setTogglePortfolio(true);
    setToggleContact(false);
    setToggleAbout(false);
    setToggleJobPreference(false);
    setToggleComments(false);
    setToggleApplicantReviews(false);


  };
  const commentsHandler = () => {
    setToggleComments(true);
    setToggleContact(false);
    setToggleAbout(false);
    setToggleJobPreference(false);
    setTogglePortfolio(false);
    setToggleApplicantReviews(false);


  };
  const applicantReviewsHandler = () => {
    setToggleApplicantReviews(true);
    setToggleComments(false);
    setToggleContact(false);
    setToggleAbout(false);
    setToggleJobPreference(false);
    setTogglePortfolio(false);

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
    if (e.target.files[0].size > 1024 * 1024 * 2) {
      alert('Please upload image 2MB or below')
      return
    }
    ReactSaveImg
      .uploadFile(e.target.files[0], newFileName)
      .then((data) => {
        setImage("")
        setImage(data.location)
      })
      .catch(err => console.error(err))
  }

  function handleOnSubmit(e) {
    e.preventDefault();
   
    let available = null
    if (availableArr && availableArr.length > 0) {
      available = availableArr.map((arr) => {
        return arr.value
      })
    }
   

    let skill = null
    if (skillArr && skillArr.length > 0) {
      skill = skillArr.map((arr) => {
        return arr.value
      })
    }
    

    let industry = null
    if (industryArr && industryArr.length > 0) {
      industry = industryArr.map((arr) => {
        return arr.value
      })
    }

    updateEEProfileAction(name, intro, phone, expectedSalary, industry, available, location, image, expYr, skill, salaryType)
    updateToast()
  }


  //******for input box****** */
  const [inputBoxID, setInputBoxID] = useState('')

  function changeInputID(id) {

    setInputBoxID(id)
  }


  return (
    <div>
      <ApplicantNavbar />
      <div className="container emp-profile">
        <Form className='form-group' onSubmit={(e) => handleOnSubmit(e)}>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <ProfileImage url={image} handleOnChange={(e) => upload(e)} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <FormGroup>
                  <h3 style={{marginBottom:'10px'}}>Applicant's Name:</h3>
                  <Input style={{marginBottom:'10px'}} type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </FormGroup>
                <DisabledRating
                  rating={averageRating}
                />
                <ApplicantPortfolioTable aboutHandler={aboutHandler} contactHandler={contactHandler} jobPreferenceHandler={jobPreferenceHandler} portfolioHandler={portfolioHandler} commentsHandler={commentsHandler} applicantReviewsHandler={applicantReviewsHandler} />

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              

      
            </div>

            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
               
                <div className="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                  {toggleAbout &&
                    <div>
                      <div className="row">
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Self-Introduction:

                                </Typography>
                                <Input style={{ marginTop: "10px" }} type="textarea" name="text" id="intro" value={intro} onChange={(e) => setIntro(e.target.value)} />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                         
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Skills:

                                </Typography>
                                <SkillsTag />                                  </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                
                        </FormGroup>

                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Job Function:

                                </Typography>
                                <IndustryTag />                                  </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>

                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>

                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Years Of Work Experience:

                                </Typography>
                                <Input style={{ marginTop: "10px" }} type="text" name="skill" id="Skill" placeholder="Tags" value={expYr} onChange={(e) => setExpYr(e.target.value)} />                                </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>
                      </div>
                    </div>
                  }
                  {toggleContact &&
                    <div>
                      <div className="row">

                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Email:

                                </Typography>
                                <Typography gutterBottom variant="h6" component="h3">
                                  {ee_email}

                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Phone Number

                                </Typography>

                                <Input style={{ marginTop: "10px" }} type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                              </CardContent>

                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                       
                        </FormGroup>
                      </div>
                    </div>
                  }
                  {toggleApplicantReviews &&
                    <div>
                      <div className="row">
                        {applicantCreatedRatingState.length > 0 && applicantCreatedRatingState
                          .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize
                          )
                          .map((eachCreatedData) => {

                            return (<FormGroup key={eachCreatedData.rating_id} >
                         
                              <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                                <CardActionArea>

                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      Company Name: {eachCreatedData.er_name} <br></br>
                                      Job Title: {eachCreatedData.job_title} <DisabledRating rating={eachCreatedData.rate} />
                                    </Typography>
                                    <p>{eachCreatedData.comment}</p>
                          
                                    {inputBoxID && inputBoxID === eachCreatedData.rating_id ? <Input type="textarea" value={comments} onChange={(e) => setComment(e.target.value)} /> : null}


                                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: "black" }}>
                                      {new Date(eachCreatedData.updated_at).toLocaleString()}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions>

                                  {inputBoxID && inputBoxID === eachCreatedData.rating_id ? <Button size="small" color="primary" onClick={() => updateApplicantCreatedRatingThunkAction(eachCreatedData.er_id, eachCreatedData.application_id, eachCreatedData.rate, comments).then(updateReviewToast).then(setInputBoxID('')).then(setComment(''))}>
                                    Update Post
                                  </Button> : null}
                                  <Button size="small" color="primary" onClick={() => changeInputID(eachCreatedData.rating_id)}>
                                    Edit Post
                                  </Button>


                                </CardActions>
                              </Card>
                            </FormGroup>)


                          })}

                        <div style={{ overflowX: "auto", justifyContent: "center", display: "flex" }}>
                          <Pagination>

                            <PaginationItem disabled={currentPage <= 0}>

                              <PaginationLink
                                onClick={e => handleClick(e, currentPage - 1)}
                                previous
                                href="#"
                              />

                            </PaginationItem>

                            {[...Array(pagesCount)].map((page, i) =>
                              <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )}

                            <PaginationItem disabled={currentPage >= pagesCount - 1}>

                              <PaginationLink
                                onClick={e => handleClick(e, currentPage + 1)}
                                next
                                href="#"
                              />

                            </PaginationItem>

                          </Pagination>
                        </div>

                      </div>

                    </div>
                  }

                  {toggleComments &&
                    <div>
                      <div className="row">
                        {applicantRatingState.length > 0 && applicantRatingState
                          .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize
                          )
                          .map((eachData) =>
                            <FormGroup key={eachData.rating_id} >
                              <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                                <CardActionArea>

                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                      Review: <DisabledRating rating={eachData.rate} />
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: "black" }}>
                                      <h5>{eachData.comment}</h5><br />
                                      {new Date(eachData.updated_at).toLocaleString()}

                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            </FormGroup>


                          )}
                        <div style={{ overflowX: "auto", justifyContent: "center", display: "flex", }}>
                          <Pagination>

                            <PaginationItem disabled={currentPage <= 0}>

                              <PaginationLink
                                onClick={e => handleClick(e, currentPage - 1)}
                                previous
                                href="#"
                              />

                            </PaginationItem>

                           
                            {[...Array(pagesCount)].map((page, i) =>
                              <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => handleClick(e, i)} href="#">
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )}

                            <PaginationItem disabled={currentPage >= pagesCount - 1}>

                              <PaginationLink
                                onClick={e => handleClick(e, currentPage + 1)}
                                next
                                href="#"
                              />

                            </PaginationItem>

                          </Pagination>
                        </div>

                      </div>

                    </div>
                  }

                  {toggleJobPreference &&
                    <div>
                      <div className="row">
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Availabilty:

                                </Typography>

                                <AvailabilityTag />


                              </CardContent>

                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>

                      </div>



                      <div className="col-md-6">
                      </div>
                      <div className="row">
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Salary Type:

                                </Typography>

                                <Input style={{ marginTop: "10px" }} type="select" name="select" id="salaryType" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                                  <option defaultValue={null}>Please select</option>
                                  <option value={'perJob'}>Per Job</option>
                                  <option value={'perHour'}>Per Hour</option>
                                </Input>


                              </CardContent>

                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                       </FormGroup>

                      </div>

                      {ee_salary_type ? (
                        <div className="row" style={{ marginTop: "20px" }}>
                          <FormGroup>
                            <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                              <CardActionArea>

                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    Expected Salary:

                                  </Typography>

                                  <Input style={{ marginTop: "10px" }} type="number" name="number" id="Expected Salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />


                                </CardContent>

                              </CardActionArea>
                              <CardActions>


                              </CardActions>
                            </Card>
                          </FormGroup>

                        </div>
                      ) : (salaryType ? (
                        <div className="row" style={{ marginTop: "20px" }}>
                          <FormGroup>
                            <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                              <CardActionArea>

                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    Expected Salary:

                                  </Typography>

                                  <Input type="number" name="number" id="Expected Salary" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} />


                                </CardContent>

                              </CardActionArea>
                              <CardActions>


                              </CardActions>
                            </Card>
                          </FormGroup>

                        </div>
                      ) : null)}

                      <div className="row">
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Prefered Work Location:

                                </Typography>

                                <Input style={{ marginTop: "10px" }} type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                                  <option defaultValue={null}>Please select</option>
                                  {locationState.length > 0 ? locationState.map((location, i) => (
                                    <option key={i} value={location.location}>{location.location}</option>
                                  )) : "loading..."}
                                </Input>


                              </CardContent>

                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>

                      </div>

                    </div>
                  }
                  {togglePortfolio &&
                    <div>
                      <div className="row">
                        <PortfolioTable eeId={ee_id} />
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <input type="submit" className="profile-edit-btn" name="btnAddMore" style={{ float: "right" }} />
          </div>
          <ToastContainer />
        </Form>
      </div>
    </div>


  )
};

export default ApplicantProfile;
