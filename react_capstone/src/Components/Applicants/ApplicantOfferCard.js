import React, { useState,useEffect }from "react";
import { Card, Badge } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useHistory } from 'react-router';
import "../../Pages/EmployerPages/employerProfilePage.css"
import 'react-toastify/dist/ReactToastify.css';
import authAxios from '../../Redux/authAxios';
import ControlledRating from '../Rating/ControlledRating';
import Chatroom from '../Chatroom/Chatroom'




const ApplicantOfferCard = (props) => {
    //toast
    const acceptToast = () => toast("You Have Accepted This Offer")
    const declineToast = () => toast("You Have Declined This Offer")
    const rateToast= () => toast("Your Rating Has Been Submitted")

    const dispatch = useDispatch();
    const { offerAcceptAction } = bindActionCreators(actionCreators, dispatch)
    const { offerDeclineAction } = bindActionCreators(actionCreators, dispatch)
    const { loadErProfileforAppThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { applicantCreatedRatingThunkAction } = bindActionCreators(actionCreators, dispatch)


    const { offerCard } = props;
    const { job_salary_type,job_function, reply, job_title, job_id, er_id, er_name, created_at, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp, application_id } = offerCard;

    console.log("testoffer", offer)
    console.log('data', job_title, job_id, er_id,er_name, created_at, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp, application_id)
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const [rating, setRating] = useState(0)
    const toggle = () => setModal(!modal);
    const [comment, setComment] = useState('')

    console.log("RATING PASSED FROM CHILD", rating)
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }
    useEffect(() => {
    applicantCreatedRatingThunkAction();
    },[])
    //load comment if there was comment
    const applicantCreatedRatingState = useSelector((state) => state.applicantCreatedRating)

    function returnComment(application_id) {
        if(applicantCreatedRatingState.length > 0 && applicantCreatedRatingState.filter(data => data.application_id === application_id)[0] !== undefined){
            let object = applicantCreatedRatingState.filter(data => data.application_id === application_id)[0].comment
            return object}
            else {
                let object = "Please Give Your Comment Here"
                return object
            }  
    }

    //to employer profile page
    const history = useHistory();
    function handleOnClick() {
        console.log('this is for applicant')
        loadErProfileforAppThunkAction(er_id).then(() => {
            history.push('/applicantEmployerDetails')
        })
    }


    function handleAccept() {
        console.log('application id', application_id)
        acceptToast()
        offerAcceptAction(application_id)
        setModal(false)
    }

    function handleDecline() {
        console.log('application id', application_id)
        declineToast()
        offerDeclineAction(application_id)
        setModal(false)
    }

    //date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    async function employerRating(er_id, application_id, rating, comment) {
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post('/employee/applicantsGiveRating', {
            er_id: er_id,
            application_id: application_id,
            rate: rating,
            comment: comment,

        }).then(res => {
            console.log("POST SUCCESS", res)
        }).catch(err => {
            console.log("job posting err res", err.response)
        })
    }

    //****************For the Chatroom********************//
    const userID = localStorage.getItem('userID')

    const [modalChatroom, setModalChatroom] = useState(false);

    const toggleChatroom = () => setModalChatroom(!modalChatroom);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>

            <Card className='my-4' style={{ width: "70%",cursor: "pointer" }}>
                <Card.Body onClick={() => setModal(!modal)}>
                    <div className="d-flex justify-content-between" >
                        <div>
                            <Card.Title>
                                {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                            </Card.Title>
                            <Card.Subtitle className="text-muted mb-2" style={{marginTop:'5px'}}>
                                {day + "/" + month + "/" + year}
                            </Card.Subtitle>
                            {offer && reply === null ? <p className="flex" style={{ color: "tomato" }}>Congratulations!! You have an offer!</p> : <p></p>}
                            {offer && reply !== null ? <p className="flex" style={{ color: "tomato" }}>You have {reply ? "accepted" : "declined"} the offer</p> : <p></p>}
                            <Badge className="job-list-badge" variant="secondary" style={{ marginRight: '5px', height:'20px' }}>{job_type}</Badge>
                            <Badge className="job-list-badge" variant="secondary" style={{height:'20px'}}>{job_location}</Badge>
                        </div>
                        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test" /> : <p></p>}
                    </div>
                </Card.Body>
                <div>
                    <Modal isOpen={modal} toggle={toggle} fade={false} >
                        <ModalBody style={{ width: "100%", height: "100%" }}>
                            <div className="container emp-profile">
                                <div className="container emp-profile">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="profile-img" onClick={handleOnClick} style={{ cursor: "pointer" }}>
                                                <img src={er_img_data} width="200px" height="200x" alt='' />
                                                <br />
                                            </div>
                                        </div>
                                        <div className="col-md-4 offset-md-4">
                                            <div className="profile-head" style={{ marginTop: "25px" }}>
                                                <Label for="CompanyName" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Company Name</Label>
                                                <Input type="text" name="text" id="CompanyName" placeholder="" value={er_name} disabled style={{ marginBottom: "10px" }} />
                                                <Label for="Job Title" onClick={handleOnClick} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Job Title</Label>
                                                <Input type="text" name="text" id="jobTitle" placeholder="" value={job_title} disabled />
                                            </div>
                                        </div>
                                        <div className="nav nav-tabs" style={{ marginTop: "10px", marginBottom: "30px" }}></div>
                                    </div>
                                </div>
                            </div>
                            <FormGroup>
                                <Label for="Text" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Job Description</Label>
                                <Input type="textarea" name="text" id="intro" placeholder="" value={job_description} disabled style={{ marginBottom: "20px" }} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="Years of Experience" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Years of Experience</Label>
                                <Input type="number" name="number" id="yearsOfExperience" placeholder="" value={req_exp} disabled style={{ marginBottom: "20px" }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Expected Salary" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Salary</Label>
                                <Input type="text" name="number" id="Salary" placeholder="Salary" value={`${expect_salary} ${job_salary_type}`} disabled style={{ marginBottom: "20px" }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="employmentType" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Employment Type</Label>
                                <Input type="select" name="employmentType" id="employmentType" value={job_type} disabled style={{ marginBottom: "20px" }}>
                                    <option>Freelance</option>
                                    <option>Part-Time</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="JobFunction" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>JobFunction</Label>
                                <Input type="textarea" name="text" id="JobFunction" placeholder="" value={job_function} disabled style={{ marginBottom: "20px" }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="preferworklocation" style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "5px" }}>Work Location</Label>
                                <Input type="text" name="select" id="preferworklocation" value={job_location} disabled />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            {reply === null && offer ? <Button color="primary" onClick={() => handleAccept()}>accept</Button> : null}
                            {reply === null && offer ? <Button color="primary" onClick={() => handleDecline()}>decline</Button> : null}
                            <Button color="success" onClick={toggleNested}>Rate Company</Button>
                            <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined} fade={false} className='smallModal'>
                                <ModalHeader>Ratings</ModalHeader>
                                <ModalBody className='smallModal'>
                                    <ControlledRating ratingValue={(value) => setRating(value)} />
                                    <h6>Comments:</h6>
                                    <Input style={{ marginTop: "10px" }} type="textarea" name="compDes" id="intro" spellCheck='true' placeholder={ applicantCreatedRatingState.length > 0 ? returnComment(application_id): "Please Give Your Comment Here"} value={comment} onChange={(e) => setComment(e.target.value)} />
                                </ModalBody>
                                <ModalFooter className='smallModal'>
                                    <Button color="primary" onClick={() => employerRating(er_id, application_id, rating, comment).then(rateToast()).then(toggleNested)}>Rate</Button>{' '}
                                    <Button color="primary" onClick={toggleNested}>Close</Button>{' '}
                                </ModalFooter>
                            </Modal>
                            <Button onClick={toggleChatroom}>Message</Button>
                            <>
                            <Modal isOpen={modalChatroom} toggle={toggleChatroom} fade={false}>
                                <ModalHeader toggle={toggleChatroom}>Chatroom</ModalHeader>
                                <ModalBody>
                                    <Chatroom chatterID={er_id} userID={userID} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="secondary" onClick={toggleChatroom}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                        <ToastContainer />
                    </Modal>
                </div>
            </Card>
        </div>
    )
}
export default ApplicantOfferCard;