import React, { useEffect } from "react";
import { Button, Form, FormGroup, Label } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import './employerProfilePage.css'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import DisabledRating from "../../Components/Rating/DisabledRating";


const EmployerSearchApplicantProfile = () => {
    const profile = useSelector((state) => state.profile)

    console.log("individual job", profile)

    const dispatch = useDispatch()
    const { loadApplicantSearchProfileThunkAction } = bindActionCreators(actionCreators, dispatch);
    const { applicantGetRatingThunkAction } = bindActionCreators(actionCreators, dispatch)

    const { ee_name, ee_industry, ee_img_data, ee_location, self_intro, expected_salary, availability, ee_exp, ee_skill } = profile

    const applicantRatingState = useSelector((state) => state.applicantRating)
    console.log('applicantRating', applicantRatingState)
    const averageRating = applicantRatingState.length > 0 && applicantRatingState.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / applicantRatingState.length;
    console.log("Average", averageRating)
  
    useEffect(() => {
        let ee_id = localStorage.getItem('applicant')
        loadApplicantSearchProfileThunkAction(ee_id)
        applicantGetRatingThunkAction(ee_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <EmployerNavbar />
            <div className="container emp-profile">
                <Form className='form-group' >
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={ee_img_data} width="200px" height="200x" alt='' />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <FormGroup>
                                    <Label for="Name"><h1>Applicant's Name</h1></Label>
                                    <h4>{ee_name}</h4>
                                </FormGroup>
                                <DisabledRating rating={averageRating}/>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
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

                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className="row">
                                    <FormGroup>
                                        <div className="col-md-6">
                                            <Label for="Text">Self-Introduction</Label>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 style={{ marginTop: "10px" }}>{self_intro}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <FormGroup>
                                        <div className="col-md-6">
                                            <Label for="Skill">Skills</Label>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 style={{ marginTop: "10px" }}>{ee_skill}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <FormGroup>
                                        <div className="col-md-6">
                                            <Label for="Skill">No. of Year of Working Experience</Label>
                                        </div>
                                        <div className="col-md-6">

                                            <h6 style={{ marginTop: "10px" }}>{ee_exp}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <FormGroup>
                                        <div className="col-md-6">
                                            <Label for="Text">Job Function</Label>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 style={{ marginTop: "10px" }}>{ee_industry}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <FormGroup>
                                        <div className="col-md-6">
                                            <Label for="Text">Perferred Location</Label>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 style={{ marginTop: "10px" }}>{ee_location}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <FormGroup>

                                        <div className="col-md-6">
                                            <Label for="Availabilty">Availabilty</Label>
                                        </div>
                                        <div className="col-md-6">

                                            <h6 style={{ marginTop: "10px" }}>{availability}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <FormGroup>

                                        <div className="col-md-6">
                                            <Label for="Availabilty">Expected Salary</Label>
                                        </div>
                                        <div className="col-md-6">

                                            <h6 style={{ marginTop: "10px" }}>{expected_salary}</h6>
                                        </div>
                                    </FormGroup>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <Button>Message</Button>
                    </div>



                </Form>


            </div>
        </div>
    )
};

export default EmployerSearchApplicantProfile;
