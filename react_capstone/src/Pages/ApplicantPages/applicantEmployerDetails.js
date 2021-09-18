import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label } from 'reactstrap';
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import '../EmployerPages/employerProfilePage.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import DisabledRating from "../../Components/Rating/DisabledRating";
import { Pagination, PaginationItem, PaginationLink, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import authAxios from '../../Redux/authAxios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const ApplicantEmployerDetails = () => {
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

    const erProfile = useSelector((state) => state.erProfile)
    const { comp_description, er_img_data, er_industry, er_location, er_name } = erProfile
    const erRating = useSelector((state) => state.eeViewErRating)
    // const {rate,comment} = erRatingState

    const dispatch = useDispatch();
    const { loadErProfileforAppThunkAction } = bindActionCreators(actionCreators, dispatch)
    const { eeViewErRatingThunkAction } = bindActionCreators(actionCreators, dispatch)


    useEffect(() => {
        const er_id = localStorage.getItem('company')
        loadErProfileforAppThunkAction(er_id)
        eeViewErRatingThunkAction(er_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //Get Avg star
    const averageRating = erRating.length > 0 && erRating.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / erRating.length
    console.log("check", erRating)

    let pageSize = 3;
    let pagesCount = erRating.length > 0 && Math.ceil(erRating.length / pageSize);

    const [toggleAbout, setToggleAbout] = useState(true);
    const [toggleComments, setToggleComments] = useState(false);

    //handle toggles 
    const aboutHandler = () => {
        setToggleAbout(true);
        setToggleComments(false);



    };
    const commentsHandler = () => {
        setToggleComments(true);
        setToggleAbout(false);



    };
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
                                    <DisabledRating rating={averageRating} />
                                </FormGroup>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <p className="nav-link active" id="home-tab" onClick={aboutHandler} style={{ cursor: "pointer" }}>About</p>
                                    </li>
                                    <li className="nav-item">
                                        <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={commentsHandler} style={{ cursor: "pointer" }}>Applicant's Reivews</p>
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
                                {toggleAbout &&
                                    <div>
                                        <div class="row">
                                            <FormGroup>
                                                <div class="col-md-6">
                                                    <Label for="Text">Company Description</Label>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{comp_description}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>
                                        <div class="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>
                                                <div class="col-md-6">
                                                    <Label for="Industry">Industry</Label>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{er_industry}</h6>
                                                </div>
                                            </FormGroup>

                                        </div>
                                        <div class="row" style={{ marginTop: "20px" }}>
                                            <FormGroup>
                                                <div class="col-md-6">
                                                    <Label for="Location">Location</Label>
                                                </div>
                                                <div class="col-md-6">
                                                    <h6 style={{ marginTop: "10px" }}>{er_location}</h6>
                                                </div>
                                            </FormGroup>
                                        </div>


                                    </div>
                                }
                            </div>
                            {toggleComments &&
                                <div>

                                    <div className="row">
                                        {erRating.length > 0 && erRating
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