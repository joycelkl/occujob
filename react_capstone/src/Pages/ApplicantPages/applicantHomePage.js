import React, { useEffect, useState } from 'react';
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import "../homePage.css"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ApplicantHomeCard from '../../Components/Applicants/ApplicantHomeJobCard';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';



const ApplicantHomePage = () => {
    const applicantJobState = useSelector((state) => state.applicantJob)
    const dispatch = useDispatch();

const [ userName, setUserName] = useState(null)    
const { loadApplicantJobThunkAction } = bindActionCreators(actionCreators, dispatch);

    let pageSize = 6;
    let pagesCount = applicantJobState.length > 0 && Math.ceil(applicantJobState.length / pageSize);

    const [currentPage, setCurrentPage] = useState(0);



    function handleClick(e, index) {

        e.preventDefault();
        setCurrentPage(index)

    }

    useEffect(() => {
        loadApplicantJobThunkAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('ApplicantJob Data', applicantJobState)

    useEffect(() => {
        if(applicantJobState.length > 0) {
            setUserName (applicantJobState.pop())
        }  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicantJobState])

    console.log('poped', userName)

    return (
        <div>
            <ApplicantNavbar />
            <section className="header">


                <div className="text-box" id="home">
                    <h1>HKFreelancer</h1>
                    <p>Welcome {userName}</p>
                    <a href="/applicantJobSearch" className="Homebtn">Search Jobs</a>
                </div>
            </section>
            <div className="jobCard">

                {applicantJobState.length > 0 && applicantJobState
                    .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                    )
                    .map((applicantJob, index) =>
                        <ApplicantHomeCard
                            key={index}
                            applicantJob={applicantJob}
                        />
                    )}
                <div style={{overflowX:"auto", justifyContent:"center", display:"flex",}}>
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
    )
};

export default ApplicantHomePage;
