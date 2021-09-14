import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar/navbarLogin';
import "./homePage.css";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import HomeCard from '../Components/HomeCard';


const Home = () => {

    const publicJobState = useSelector((state) => state.publicJob)
    const dispatch = useDispatch();

    const { loadPublicJobThunkAction } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
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
                {publicJobState.length > 0 ? publicJobState.map((publicJob, index) => (
                    <HomeCard
                        key={index}
                        publicJob={publicJob}
                    />
                )): "loading..." }
            </div>
        </div>
    )
};

export default Home;