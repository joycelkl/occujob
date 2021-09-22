import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter,Input } from 'reactstrap';
import authAxios from '../Redux/authAxios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Pages/EmployerPages/employerProfilePage.css"
import Chatroom from "./Chatroom/Chatroom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import JobDetailPortfolioTable from "../Components/PortfolioTablejobDetail";
import "../Pages/EmployerPages/employerProfilePage.css"



const JobDetail = (props) => {
    const applyToast = () => toast("You Have Applied this Job")

    const [employerId, setEmployerId] = useState('')
    const [userId, setUserId] = useState('')
    const [toggleAbout, setToggleAbout] = useState(true);
    const [toggleContact, setToggleContact] = useState(false);
  
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

    const { indJob } = props;
    const { job_salary_type, er_id, job_title, job_id, er_name, job_function, job_type, job_location, er_img_data, job_description, work_period, expect_salary, req_exp } = indJob[0];

    const dispatch = useDispatch();
    const { loadErProfileforAppThunkAction } = bindActionCreators(actionCreators, dispatch)

    async function applyJob(job_id) {
        console.log("offer app ID", job_id)
        applyToast()
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post(`/employee/search/result/${job_id}`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log("pubulic job load err res", err.response)
            })
    }

    const history = useHistory();

    const goBack = () => {
        // the history object of the `this.props` here can do goBack(), push()
        //   or replace() to change the route programmatically
        history.goBack();
    };


    function handleOnClick() {
        localStorage.setItem('company', er_id)
        loadErProfileforAppThunkAction(er_id).then(() => {
            history.push('/applicantEmployerDetails')
        })
    }

    useEffect(() => {
        const userID = localStorage.getItem('userID')
        console.log('UserID', userID)
        setUserId(userID)
        setEmployerId(er_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [er_id])

    //****************For the Chatroom********************//
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

      //handle toggles 
    const aboutHandler = () => {
        setToggleAbout(true);
        setToggleContact(false);
        
    
      };
      const contactHandler = () => {
        setToggleContact(true);
        setToggleAbout(false);
        
      };


    return (

        <div className="container emp-profile">
            <div className="container emp-profile">
                <Form className="form-group" >
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img" onClick={handleOnClick} style={{ cursor: "pointer" }}>
                                <img src={er_img_data} width="200px" height="200x" alt='' />
                                <br />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head" style={{ marginTop: "25px" }}>
                                <Label for="CompanyName" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "25px" }}>Company Name</Label>
                                <h4>{er_name}</h4>
                                <Label for="Job Title" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginBottom: "5px", fontSize: "25px" }}>Job Title</Label>
                                <h4>{job_title}</h4>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <JobDetailPortfolioTable aboutHandler={aboutHandler} contactHandler={contactHandler}/>

                    {toggleAbout &&
                    <div>
                      <div className="row">
                        <FormGroup>
                          <Card style={{ width: "600px", marginBottom: "30px" }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Job Description:
                                 <br/> {job_description}
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
                                Required Experience
                                <br/> {req_exp} Years
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
                                  Job Function:
                                  <br/> {job_function}
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                          {/* <div className="col-md-6">
                            <Label for="industry">Job Function</Label>
                          </div>
                          <div className="col-md-6" style={{ marginTop: "10px" }}>
                            <IndustryTag />
                          </div> */}
                        </FormGroup>

                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>

                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Job Type:
                               <br/>{job_type}
                                </Typography>
                                </CardContent>
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
                                  Expected Salary
                                <br/> {expect_salary} {job_salary_type}

                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                          {/* <div className="col-md-6">
                            <Label for="email">Email </Label>
                          </div>
                          <div className="col-md-6">
                            <h6 style={{ color: "black", marginTop: "10px" }}> {ee_email} </h6>                         
                             </div> */}
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Work Period
                                <br/> {work_period}
                                </Typography>
                              </CardContent>

                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                          {/* <div className="col-md-6">
                            <Label for="phone">Phone Number</Label>
                          </div>
                          <div className="col-md-6">
                            <Input style={{ marginTop: "10px" }} type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                          </div> */}
                        </FormGroup>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <FormGroup>
                          <Card className={classes.root} style={{ width: "600px", marginBottom: "30px", overflow: 'visible' }}>
                            <CardActionArea>

                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                Working Location:
                                <br/>{job_location}
                                </Typography>
                              </CardContent>

                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                          </Card>
                          {/* <div className="col-md-6">
                            <Label for="phone">Phone Number</Label>
                          </div>
                          <div className="col-md-6">
                            <Input style={{ marginTop: "10px" }} type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                          </div> */}
                        </FormGroup>
                      </div>
                    </div>
                  }

                    <div style={{ marginTop: "20px", float: "right" }}>
                        <Button onClick={() => applyJob(job_id)} style={{ marginRight: "10px" }}>Apply</Button>
                        <Button onClick={toggle}>Message</Button>
                        <Button onClick={goBack} style={{ marginLeft: "10px" }}>Go Back</Button>
                        <>
                            <Modal isOpen={modal} toggle={toggle} fade={false}>
                                <ModalHeader toggle={toggle}>Chatroom</ModalHeader>
                                <ModalBody>
                                    <Chatroom chatterID={employerId} userID={userId} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </>
                    </div>
                </Form>
            </div>
            <ToastContainer />
        </div >
    )
}
export default JobDetail;
