import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/navbarLogin';
import "./homePage.css";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import HomeCard from '../Components/HomeCard';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const Home = () => {

    const publicJobState = useSelector((state) => state.publicJob)
    const dispatch = useDispatch();

    const { loadPublicJobThunkAction } = bindActionCreators(actionCreators, dispatch)
    let pageSize = 6;
    let pagesCount = publicJobState.length > 0 && Math.ceil(publicJobState.length / pageSize);

    const [currentPage, setCurrentPage] = useState(0);



    function handleClick(e, index) {

        e.preventDefault();
        setCurrentPage(index)

    }
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

                {
                publicJobState.length > 0 && publicJobState
                    .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                    )
                    .map((publicJob, index) =>
                        <HomeCard
                            key={index}
                            publicJob={publicJob}
                        />
                    )}
                <div style={{ overflowX: "auto", justifyContent: "center", display: "flex" }}>
                    <Pagination>

                        <PaginationItem disabled={currentPage <= 0}>

                            <PaginationLink
                                onClick={e => handleClick(e, currentPage - 1)}
                                previous
                                href="#"
                            />

                        </PaginationItem>

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

                {/* {publicJobState.length > 0 ? publicJobState.map((publicJob, index) => (
                    <HomeCard
                        key={index}
                        publicJob={publicJob}
                    />
                )): "loading..." } */}
            </div>
        </div>
    )
};

export default Home;