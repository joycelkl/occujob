import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import './employerProfilePage.css'
import ProfileImage from "../../Components/ProfileImage";
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useHistory } from 'react-router';

const EmployerSearchApplicantProfile = () => {
    const profile = useSelector((state) => state.profile)

    console.log("individual job", profile)

    const dispatch = useDispatch()
    const { ee_id, ee_name, ee_email, ee_industry, ee_img_data, ee_location, self_intro, ee_phone, expected_salary, availability, ee_exp, ee_skill, ee_salary_type } = profile




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
                                    <Input type="text" name="name" value={ee_name} id="name" disabled />
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
                                                <Input type="textarea" name="text" value={self_intro}id="intro" disabled/>
                                            </div>
                                        </FormGroup>
                                    </div>
                                    <div class="row">
                                        <FormGroup>
                                            <div class="col-md-6">
                                                <Label for="Skill">Skills</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <Input type="textarea" name="text" value={ee_skill}id="skills" disabled/>
                                            </div>
                                        </FormGroup>

                                    </div>
                                    <div class="row">
                                        <FormGroup>
                                            <div class="col-md-6">
                                                <Label for="Skill">No. of Year of Working Experience</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <Input type="text" name="skill" id="Skill" placeholder={ee_exp} disabled/>
                                            </div>
                                        </FormGroup>
                                    </div>

                                    <div class="row">
                                        <FormGroup>

                                            <div class="col-md-6">
                                                <Label for="Availabilty">Availabilty</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <Input type="textarea" name="text" id="availability" value={availability} disabled/>
                                            </div>
                                        </FormGroup>
                                        

                                    </div>
                                    <div class="row">
                                        <FormGroup>

                                            <div class="col-md-6">
                                                <Label for="Availabilty">Expected Salary</Label>
                                            </div>
                                            <div class="col-md-6">
                                                <Input type="textarea" name="text" id="expectedSalary" value={expected_salary} disabled/>
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