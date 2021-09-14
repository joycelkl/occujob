import React, { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import './employerProfilePage.css'
import ProfileImage from "../../Components/ProfileImage";
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';


const EmployerSearchApplicantProfile = () => {
    const profile = useSelector((state) => state.profile)

    console.log("individual job", profile)

    const dispatch = useDispatch()
    const { loadApplicantSearchProfileThunkAction } = bindActionCreators(actionCreators,dispatch);

    const { ee_id, ee_name, ee_industry, ee_img_data, ee_location, self_intro, expected_salary, availability, ee_exp, ee_skill} = profile



    useEffect(()=>{
        loadApplicantSearchProfileThunkAction(ee_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <EmployerNavbar />
            <div class="container emp-profile">
                <Form className='form-group' >
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                            <img src={ee_img_data} width="200px" height="200x" alt=''/>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="profile-head">
                                <FormGroup>
                                    <Label for="Name"><h1>Applicant's Name</h1></Label>
                                    <h4>{ee_name}</h4>
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
                               
                                    <div class="row">
                                        <FormGroup>
                                            <div class="col-md-6">
                                                <Label for="Text">Self-Introduction</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6 style={{marginTop:"10px"}}>{self_intro}</h6>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div class="row" style={{marginTop:"20px"}}>
                                        <FormGroup>
                                            <div class="col-md-6">
                                                <Label for="Skill">Skills</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6 style={{marginTop:"10px"}}>{ee_skill}</h6>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div class="row">
                                        <FormGroup>
                                            <div class="col-md-6">
                                                <Label for="Text">Job Function</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <h6 style={{marginTop:"10px"}}>{ee_industry}</h6>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div class="row" style={{marginTop:"20px"}}>
                                        <FormGroup>
                                            <div class="col-md-6">
                                                <Label for="Skill">No. of Year of Working Experience</Label>
                                            </div>
                                            <div class="col-md-6">
                                                
                                                <h6 style={{marginTop:"10px"}}>{ee_exp}</h6>
                                            </div>
                                        </FormGroup>
                                    </div>

                                    <div class="row" style={{marginTop:"20px"}}>
                                        <FormGroup>

                                            <div class="col-md-6">
                                                <Label for="Availabilty">Availabilty</Label>
                                            </div>
                                            <div class="col-md-6">
                                                
                                                <h6 style={{marginTop:"10px"}}>{availability}</h6>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div class="row" style={{marginTop:"20px"}}>
                                        <FormGroup>

                                            <div class="col-md-6">
                                                <Label for="Availabilty">Expected Salary</Label>
                                            </div>
                                            <div class="col-md-6">
                                                
                                                <h6 style={{marginTop:"10px"}}>{expected_salary}</h6>
                                            </div>
                                        </FormGroup>

                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <Button>Message</Button>
                    </div>



                </Form>


            </div>
        </div>
    )
};

export default EmployerSearchApplicantProfile;