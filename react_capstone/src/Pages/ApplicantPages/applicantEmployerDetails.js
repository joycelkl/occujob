import React, {useEffect} from "react";
import { Form, FormGroup, Label} from 'reactstrap';
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import '../EmployerPages/employerProfilePage.css'
import {useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import DisabledRating from "../../Components/Rating/DisabledRating";


const ApplicantEmployerDetails = () => {
    const erProfile = useSelector((state) => state.erProfile)
    const {comp_description, er_img_data, er_industry, er_location, er_name} = erProfile
    const employerRatingState = useSelector((state) => state.employerRating)
    const dispatch = useDispatch();
    const { loadErProfileforAppThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { employerGetRatingThunkAction } = bindActionCreators(actionCreators, dispatch)
    const averageRating = employerRatingState.length > 0 && employerRatingState.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / employerRatingState.length;
    console.log("Average", averageRating,employerRatingState)

    useEffect(()=>{
        const er_id = localStorage.getItem('company')
        loadErProfileforAppThunkAction(er_id)
        employerGetRatingThunkAction(er_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
                                    <h3>{er_name}</h3>
                                    <DisabledRating rating={averageRating}/>
                                </FormGroup>
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
                            {/* <div class="profile-work">
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
                            </div> */}
                        </div>

                        <div class="col-md-8">
                            <div class="tab-content profile-tab" id="myTabContent">

                                <div class="row">
                                    <FormGroup>
                                        <div class="col-md-6">
                                            <Label for="Text">Company Description</Label>
                                        </div>
                                        <div class="col-md-6">
                                            <h6 style={{marginTop:"10px"}}>{comp_description}</h6>
                                        </div>
                                    </FormGroup>
                                </div>
                                <div class="row" style={{marginTop:"20px"}}>
                                    <FormGroup>
                                        <div class="col-md-6">
                                            <Label for="Industry">Industry</Label>
                                        </div>
                                        <div class="col-md-6">
                                        <h6 style={{marginTop:"10px"}}>{er_industry}</h6>
                                        </div>
                                    </FormGroup>

                                </div>
                                <div class="row" style={{marginTop:"20px"}}>
                                    <FormGroup>
                                        <div class="col-md-6">
                                            <Label for="Location">Location</Label>
                                        </div>
                                        <div class="col-md-6">
                                        <h6 style={{marginTop:"10px"}}>{er_location}</h6>
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