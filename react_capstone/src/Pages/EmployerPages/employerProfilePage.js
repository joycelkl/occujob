import React, { useState, useEffect } from 'react'
import { FormGroup, Input, Form } from 'reactstrap';
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
import DisabledRating from '../../Components/Rating/DisabledRating';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
  const { employerUpdateRating} = bindActionCreators(actionCreators, dispatch)
  

  //toast
  const updateToast = () => toast("Profile Updated");
  const updateReviewToast = () => toast("Review Has Been Updated");

  const erProfileState = useSelector((state) =>  state.erProfile);

  const { er_id, er_email, comp_description, er_img_data, er_industry, er_location, er_name, er_phone } = erProfileState

  const locationState = useSelector((state) => state.location);
  
  const employerRatingState = useSelector((state) => state.employerRating)

  const employerCreatedRatingState = useSelector((state) =>state.employerCreatedRating)
 

  

  //rating
  const averageRating = employerRatingState.length > 0 && employerRatingState.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / employerRatingState.length;

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
 
    updateErProfileAction(industry, compDescription, phone, location, image)
    updateToast()
  }

   //******for input box****** */
   const [inputBoxID, setInputBoxID] = useState('')

   function changeInputID(id) {
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
                <h3 style={{marginBottom:'10px'}}>Company's Name:</h3>
                  <h3 style={{marginBottom:'10px'}}>{name}</h3>
                </FormGroup>
                <DisabledRating
                  rating={averageRating}
                />
               <EmployerPortfolioTable aboutHandler={aboutHandler} contactHandler={contactHandler} commentsHandler={commentsHandler} employerReviewsHandler={employerReviewsHandler} className="display:flex; align-items:flexend"/>

              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-md-4">
             
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
              
                <div className="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                 
                  {toggleContact &&
                    <div>
                      <div className="row">
                        <FormGroup>
                        <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Email:

                                </Typography>
                                <Typography gutterBottom variant="h6" component="h3">
                                {email}

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
                        <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Phone Number:

                                </Typography>
                                <Input style={{ marginTop: "10px" }} type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                         
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

                            return (<FormGroup key={eachCreatedData.rating_id} >
                              <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                                <CardActionArea>

                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                     Applicant Name: {eachCreatedData.ee_name} <br></br>
                                     Job Title: {eachCreatedData.job_title} 
                                     <br></br>
                                     <DisabledRating rating={eachCreatedData.rate} />
                                    </Typography>
                                    
                                    <h5>{eachCreatedData.comment}</h5>
                                 
                                    {inputBoxID &&  inputBoxID === eachCreatedData.rating_id ? <Input type="textarea" value={comments} onChange={(e) => setComment(e.target.value)} /> : null}
                                    <br></br>

                                    <Typography variant="body2" color="textSecondary" component="p" style={{ color: "black" }}>
                                    {new Date(eachCreatedData.updated_at).toLocaleString()}                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions>

                                  {inputBoxID && inputBoxID === eachCreatedData.rating_id ? <Button size="small" color="primary" onClick={() => employerUpdateRating(eachCreatedData.ee_id, eachCreatedData.application_id, eachCreatedData.rate, comments).then(updateReviewToast).then(setInputBoxID('')).then(setComment(''))}>
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
                        {employerRatingState.length > 0 && employerRatingState
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
                                    Review: <DisabledRating rating={eachData.rate}/>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" style={{color:"black"}}>
                                    <h5>{eachData.comment}</h5><br/>
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

                  {toggleAbout &&
                    <div>
                      <div className="row" >

                        <FormGroup>
                        <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Company Description:

                                </Typography>
                                <Input style={{ marginTop: "10px" }} type="textarea" name="compDes" id="intro" spellCheck='true' placeholder="Company Description" value={compDescription} onChange={(e) => setCompDescription(e.target.value)} />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                        <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Industry:

                                </Typography>
                                <Input style={{ marginTop: "10px" }} type="text" name="industry" id="companyIndustry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                        </FormGroup>

                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                        <Card className={classes.root} style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Location:

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