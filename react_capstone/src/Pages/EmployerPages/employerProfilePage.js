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
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import DisabledRating from '../../Components/Rating/DisabledRating';
import { Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import authAxios from '../../Redux/authAxios';


const EmployerProfilePage = () => {

 //comment card
 const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 170,
  },
});



const [currentPage, setCurrentPage] = useState(0);
function handleClick(e, index) {

  e.preventDefault();
  setCurrentPage(index)

}

const dispatch = useDispatch();

  const { loadErProfileThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { updateErProfileAction } = bindActionCreators(actionCreators, dispatch)
  const { loadLocationThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { employerGetRatingThunkAction } = bindActionCreators(actionCreators, dispatch)
  const { employerCreatedRatingThunkAction} = bindActionCreators(actionCreators, dispatch)
  //toast
  const updateToast = () => toast("Profile Updated");
  const updateReviewToast = () => toast("Review Has Been Updated");

  const erProfileState = useSelector((state) => {
    console.log("ER", state.erProfile);
    return state.erProfile
  });
  console.log("Profile", erProfileState)
  const { er_id, er_email, comp_description, er_img_data, er_industry, er_location, er_name, er_phone } = erProfileState

  const locationState = useSelector((state) => {
    console.log("location", state.location);
    return state.location
  });
  console.log("location?twice", locationState)

  const employerRatingState = useSelector((state) => {
  return state.employerRating})
  console.log('employer rating', employerRatingState)

  const employerCreatedRatingState = useSelector((state) => 
  {return state.employerCreatedRating})
  console.log('employerCreatedRating???', employerCreatedRatingState)

  



  //rating
  const averageRating = employerRatingState.length > 0 && employerRatingState.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / employerRatingState.length;
  console.log("Average", averageRating)


  //update
  async function employerUpdateRating(ee_id, application_id, rating, comments) {
    console.log("???", ee_id, application_id, rating, comments)
    const authAxiosConfig = await authAxios();
    return await authAxiosConfig.post('/employer/companyGiveRating', {
      ee_id: ee_id,
      application_id: application_id,
      rate: rating,
      comment: comments,

    }).then(res => {
      console.log("POST SUCCESS", res)
    }).catch(err => {
      console.log("job posting err res", err.response)
    })
  }

  let pageSize = 3;
  let pagesCount = employerRatingState.length > 0 && Math.ceil(employerRatingState.length / pageSize);

  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [compDescription, setCompDescription] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [toggleAbout, setToggleAbout] = useState(true);
  const [toggleContact, setToggleContact] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleEmployerReviews, setToggleEmployerReviews] = useState(false);
  const [rate, setRate] = useState('');
  const [comments, setComment] = useState('');

  useEffect(() => {
    loadErProfileThunkAction();
  
    er_industry !== null && setIndustry(er_industry)
    er_location !== null && setLocation(er_location)
    er_phone !== null && setPhone(er_phone)
    comp_description !== null && setCompDescription(comp_description)
    er_img_data !== null && setImage(er_img_data)
    setName(er_name)
    setEmail(er_email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [er_name, er_phone])

  console.log('image', image)
  useEffect(() => {
    loadLocationThunkAction();
    employerGetRatingThunkAction();
    employerCreatedRatingThunkAction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //handle toggles 
  const aboutHandler = () => {
    setToggleAbout(true);
    setToggleContact(false);
    setToggleComments(false);
    setToggleEmployerReviews(false);

  };
  const contactHandler = () => {
    setToggleContact(true);
    setToggleAbout(false);
    setToggleComments(false);
    setToggleEmployerReviews(false);

  };
  const commentsHandler = () => {
    setToggleComments(true);
    setToggleEmployerReviews(false);
    setToggleContact(false);
    setToggleAbout(false);

  };
  const employerReviewsHandler = () => {
    setToggleEmployerReviews(true);
    setToggleComments(false);
    setToggleContact(false);
    setToggleAbout(false);

  };

  //rating
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

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
    if (e.target.files[0].size > 1024 * 1024) {
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

   //******for input box****** */
   const [inputBoxID, setInputBoxID] = useState('')

   function changeInputID(id) {
 
     console.log('changing id', id)
     setInputBoxID(id)
   }
 

  return (
    <div>
      <EmployerNavbar />
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

                  <h2>{name}</h2>
                </FormGroup>
                {/* <h6>
                  Web Developer and Designer
                </h6> */}
                <p className="proile-rating">Ratings : </p>



                <DisabledRating
                  rating={averageRating}
                />
                <EmployerPortfolioTable aboutHandler={aboutHandler} contactHandler={contactHandler} commentsHandler={commentsHandler} employerReviewsHandler={employerReviewsHandler} />
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                {/* <p>WORK LINK</p>
                <a href="*">Website Link</a><br />
                <a href="*">Bootsnipp Profile</a><br />
                <a href="*">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="*">Web Designer</a><br />
                <a href="*">Web Developer</a><br />
                <a href="*">WordPress</a><br />
                <a href="*">WooCommerce</a><br />
                <a href="*">PHP, .Net</a><br /> */}
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                {/* fade cause problem */}
                {/* <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"> */}
                <div className="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  {toggleContact &&
                    <div>
                      <div className="row">
                        <FormGroup>
                          <div className="col-md-6">
                            <Label for="email">Email</Label>
                          </div>
                          <div className="col-md-6">
                            {/* <Input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled /> */}
                            <h6 style={{ color: "black", marginTop: "10px" }}> {email} </h6>
                          </div>
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <div className="col-md-6">
                            <Label for="phone">Phone Number</Label>
                          </div>
                          <div className="col-md-6">
                            <Input style={{ marginTop: "10px" }} type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
                          </div>
                        </FormGroup>
                      </div>
                    </div>
                  }

{toggleEmployerReviews &&
                    <div>
                      <div className="row">
                        {employerCreatedRatingState.length > 0 && employerCreatedRatingState
                          .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize
                          )
                          .map((eachCreatedData) => {

                            console.log('each', eachCreatedData)

                            return (<FormGroup key={eachCreatedData.rating_id} >
                              {/* <div className="col-md-6">
                              <Label for="comment"> Review: </Label>
                            </div>
                            <div className="col-md-6">
                              <Input style={{ marginTop: "10px" }} type="textarea" name="comment" id="comment" value={eachData.comment} disabled />
                            </div> */}
                              <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                                <CardActionArea>

                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                     Applicant Name: {eachCreatedData.ee_name} <br></br>
                                     Job Title: {eachCreatedData.job_title} <DisabledRating rating={eachCreatedData.rate} />
                                    </Typography>
                                    <p>{eachCreatedData.comment}</p>
                                    {/* <Input type="textarea" placeholder={eachCreatedData.comment} value={comments} onChange={(e) => setComment(e.target.value)} /> */}
                                    {inputBoxID && inputBoxID === eachCreatedData.rating_id ? <Input type="textarea" value={comments} onChange={(e) => setComment(e.target.value)} /> : null}


                                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: "black" }}>
                                    {new Date(eachCreatedData.updated_at).toLocaleString()}                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions>

                                  {inputBoxID && inputBoxID === eachCreatedData.rating_id ? <Button size="small" color="primary" onClick={() => employerUpdateRating(eachCreatedData.ee_id, eachCreatedData.application_id, eachCreatedData.rate, comments).then(updateReviewToast)}>
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

                            {/* 
          {applicantJobState.length > 0 ? applicantJobState.map((applicantJob, index) => (
                  <ApplicantHomeCard
                      key={index}
                      applicantJob={applicantJob}
                  />
              )) : "loading..."} */}
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
                        {employerRatingState.length > 0 && employerRatingState
                          .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize
                          )
                          .map((eachData) =>
                            <FormGroup key={eachData.rating_id} >
                              {/* <div className="col-md-6">
                                <Label for="comment"> Review: </Label>
                              </div>
                              <div className="col-md-6">
                                <Input style={{ marginTop: "10px" }} type="textarea" name="comment" id="comment" value={eachData.comment} disabled />
                              </div> */}
                              <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                                <CardActionArea>

                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Review: <DisabledRating rating={eachData.rate}/>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{color:"black"}}>
                                    <h1>{eachData.comment}</h1><br/>
                                    {new Date(eachData.updated_at).toLocaleString()}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                {/* <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions> */}
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

                            {/* 
            {applicantJobState.length > 0 ? applicantJobState.map((applicantJob, index) => (
                    <ApplicantHomeCard
                        key={index}
                        applicantJob={applicantJob}
                    />
                )) : "loading..."} */}
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

                  {toggleAbout &&
                    <div>
                      <div className="row" >
                        <FormGroup>

                          <div className="col-md-6">
                            <Label for="compDes">Company Description</Label><br></br>
                          </div>
                          <div className="col-md-6">
                            <Input style={{ marginTop: "10px" }} type="textarea" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={compDescription} onChange={(e) => setCompDescription(e.target.value)} />
                          </div>
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <div className="col-md-6">
                            <Label for="industry">Industry</Label>
                          </div>
                          <div className="col-md-6">
                            <Input style={{ marginTop: "10px" }} type="text" name="industry" id="companyIndustry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                          </div>
                        </FormGroup>

                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>

                          <div className="col-md-6">
                            <Label for="location">Location</Label>
                          </div>
                          <div className="col-md-6">
                            <Input style={{ marginTop: "10px" }} type="select" name="location" id="location" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)}>
                              <option defaultValue={null}>Please select</option>
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
          <div className="col-md-2">
            <input type="submit" className="profile-edit-btn" name="btnAddMore" />
          </div>
          <ToastContainer />
        </Form>
      </div>
    </div>

  )
}


export default EmployerProfilePage;
