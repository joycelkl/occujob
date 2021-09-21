import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import './employerProfilePage.css'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import DisabledRating from "../../Components/Rating/DisabledRating";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PortfolioTable from "../../Components/Applicants/PortfolioTable";
import { useHistory } from 'react-router';


const EmployerSearchApplicantProfile = () => {

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
    const history = useHistory();
    
    const goBack = () => {
        history.goBack();
    };



    const profile = useSelector((state) => state.profile)
    console.log("individual job", profile)
    const dispatch = useDispatch()
    const { loadApplicantSearchProfileThunkAction } = bindActionCreators(actionCreators, dispatch);
    const { erViewEeRatingThunkAction } = bindActionCreators(actionCreators, dispatch)

    const { ee_name, ee_industry, ee_img_data, ee_location, self_intro, expected_salary, availability, ee_exp, ee_skill } = profile

    const applicantRatingState = useSelector((state) => state.erViewEeRating)
    console.log('applicantRating', applicantRatingState)
    const averageRating = applicantRatingState.length > 0 && applicantRatingState.map((data) => data.rate).reduce((prevValue, currValue) => prevValue + currValue) / applicantRatingState.length;
    console.log("Average", averageRating)

    useEffect(() => {
        let ee_id = localStorage.getItem('applicant')
        loadApplicantSearchProfileThunkAction(ee_id)
        erViewEeRatingThunkAction(ee_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let pageSize = 3;
    let pagesCount = applicantRatingState.length > 0 && Math.ceil(applicantRatingState.length / pageSize);

    const [toggleAbout, setToggleAbout] = useState(true);
    const [toggleComments, setToggleComments] = useState(false);
    const [togglePortfolio, setTogglePortfolio] = useState(false);

    //handle toggles 
    const aboutHandler = () => {
        setToggleAbout(true);
        setToggleComments(false);
        setTogglePortfolio(false);



    };
    const commentsHandler = () => {
        setToggleComments(true);
        setToggleAbout(false);
        setTogglePortfolio(false);


    };
    const portfolioHandler = () => {
        setTogglePortfolio(true);
        setToggleComments(false);
        setToggleAbout(false);



    };
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
                                    
                                    <h2>{ee_name}</h2>
                                </FormGroup>
                                <DisabledRating rating={averageRating} />
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <p className="nav-link active" id="home-tab" onClick={aboutHandler} style={{ cursor: "pointer" }}>About</p>
                                    </li>
                                    <li className="nav-item">
                                        <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={portfolioHandler} style={{ cursor: "pointer" }}>Applicant's Portfolio</p>
                                    </li>
                                    <li className="nav-item">
                                        <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={commentsHandler} style={{ cursor: "pointer" }}>Applicant's Reivews</p>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">

                        </div>

                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">


                                {toggleAbout &&
                                    <div>
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
                                }


                                {togglePortfolio &&
                                    <div>
                                        <div className="row">
                                            <PortfolioTable />
                                        </div>
                                    </div>




                                }
                                {toggleComments &&
                                    <div>

                                        <div className="row">
                                            {applicantRatingState.length > 0 && applicantRatingState
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
                    </div>
                    <div className="col-md-2" style={{float:'right'}}>
                        <Button>Message</Button>
                        <Button onClick={goBack} style={{ marginLeft: "10px" }}>Search List</Button>
                    </div>



                </Form>




            </div>
        </div>
    )
};

export default EmployerSearchApplicantProfile;
