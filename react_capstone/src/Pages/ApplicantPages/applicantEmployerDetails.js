import React from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import '../EmployerPages/employerProfilePage.css'
import {useSelector } from 'react-redux';


const ApplicantEmployerDetails = () => {
    const erProfile = useSelector((state) => state.erProfile)
    const {comp_description, er_img_data, er_industry, er_location, er_name} = erProfile
    return (
        <div>
            <ApplicantNavbar />
            <div class="container emp-profile">
                <Form className='form-group' >
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src={er_img_data} width="200px" height="200x" alt='' />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="profile-head">
                                <FormGroup>
                                    <Label for="Name"><h1>Employer's Name</h1></Label>
                                    <Input type="text" name="name" value={er_name} id="name" disabled />
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
                                            <Label for="Text">Company Description</Label>
                                        </div>
                                        <div class="col-md-6">
                                            <Input type="textarea" name="text" value={comp_description} id="des" disabled />
                                        </div>
                                    </FormGroup>
                                </div>
                                <div class="row">
                                    <FormGroup>
                                        <div class="col-md-6">
                                            <Label for="Industry">Industry</Label>
                                        </div>
                                        <div class="col-md-6">
                                            <Input type="textarea" name="text" value={er_industry} id="des" disabled />
                                        </div>
                                    </FormGroup>

                                </div>
                                <div class="row">
                                    <FormGroup>
                                        <div class="col-md-6">
                                            <Label for="Location">Location</Label>
                                        </div>
                                        <div class="col-md-6">
                                            <Input type="text" name="skill" id="Skill" placeholder={er_location} disabled />
                                        </div>
                                    </FormGroup>
                                </div>





                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <input type="Message" class="profile-edit-btn" name="btnAddMore" />
                    </div>



                </Form>


            </div>
        </div>
    )
};

export default ApplicantEmployerDetails;