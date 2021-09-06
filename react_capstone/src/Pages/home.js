import React, {useEffect} from 'react';
import { Card, Badge } from 'react-bootstrap';
import Navbar from '../Components/Navbar/navbarLogin';
import "./homePage.css";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';


const Home = () => {

    const publicJobState = useSelector((state)=>state.publicJob)
    const dispatch = useDispatch();

    const {loadPublicJobThunkAction} = bindActionCreators(actionCreators, dispatch)

    useEffect(()=>{
        loadPublicJobThunkAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // tested work, Zach please map the data to display in home page
    console.log('public Job', publicJobState)


    return (
        <div>
            <Navbar />
            <section className="header">


                <div className="text-box" id="home">
                    <h1>HKFreelancer</h1>
                    <p>Welcome to FreeLancer</p>
                    <a href="/applicantSignup" className="Homebtn">Applicant Sign Up</a>
                    <a href="/employerSignup" className="Homebtn2">Employer Sign Up</a>

                </div>
            </section>
            <div className="jobCard">
                <Card className='my-4'>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>
                                    Job Title - <span className="text-muted font-weight-light">Company Name</span>
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">
                                    08/30/2021
                                </Card.Subtitle>

                                <Badge className="job-list-badge" variant="secondary">Full Time</Badge>
                                <Badge className="job-list-badge2" variant="secondary">Central</Badge>

                            </div>
                            <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test" />
                        </div>
                    </Card.Body>
                </Card>
                <Card className='my-4'>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>
                                    Job Title - <span className="text-muted font-weight-light">Company Name</span>
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">
                                    08/30/2021
                                </Card.Subtitle>

                                <Badge className="job-list-badge" variant="secondary">Full Time</Badge>
                                <Badge className="job-list-badge2" variant="secondary">Central</Badge>

                            </div>
                            <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test" />
                        </div>
                    </Card.Body>
                </Card>
                <Card className='my-4'>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>
                                    Job Title - <span className="text-muted font-weight-light">Company Name</span>
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">
                                    08/30/2021
                                </Card.Subtitle>

                                <Badge className="job-list-badge" variant="secondary">Full Time</Badge>
                                <Badge className="job-list-badge2" variant="secondary">Central</Badge>

                            </div>
                            <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test" />
                        </div>
                    </Card.Body>
                </Card>
                <Card className='my-4'>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>
                                    Job Title - <span className="text-muted font-weight-light">Company Name</span>
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">
                                    08/30/2021
                                </Card.Subtitle>

                                <Badge className="job-list-badge" variant="secondary">Full Time</Badge>
                                <Badge className="job-list-badge2" variant="secondary">Central</Badge>

                            </div>
                            <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test" />
                        </div>
                    </Card.Body>
                </Card>
                <Card className='my-4'>
                    <Card.Body>
                        <div className="d-flex justify-content-between">
                            <div>
                                <Card.Title>
                                    Job Title - <span className="text-muted font-weight-light">Company Name</span>
                                </Card.Title>
                                <Card.Subtitle className="text-muted mb-2">
                                    08/30/2021
                                </Card.Subtitle>

                                <Badge className="job-list-badge" variant="secondary">Full Time</Badge>
                                <Badge className="job-list-badge2" variant="secondary">Central</Badge>

                            </div>
                            <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test" />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
};

export default Home;