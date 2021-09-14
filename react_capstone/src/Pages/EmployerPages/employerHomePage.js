import React, { useEffect, useState } from 'react';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import "../homePage.css"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import EmployerHomeCard from '../../Components/Employer/EmployerHomeJobCard';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';



const EmployerHomePage = () => {
    const employerJobState = useSelector((state) => state.employerJob)
    const dispatch = useDispatch();

    const { loadEmployerJobThunkAction } = bindActionCreators(actionCreators, dispatch)
const [ userName, setUserName] = useState(null)
    let pageSize = 6;
    let pagesCount = employerJobState.length > 0 && Math.ceil(employerJobState.length / pageSize);

    const [currentPage, setCurrentPage] = useState(0);



    function handleClick(e, index) {

        e.preventDefault();
        setCurrentPage(index)

    }
    useEffect(() => {
        loadEmployerJobThunkAction();   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('employer Job', employerJobState)

    useEffect(() => {
        if(employerJobState.length > 0) {
            setUserName (employerJobState.pop())
        }  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employerJobState])
   

    console.log('poped', userName)

    return (
        <div>
            <EmployerNavbar />
            <section className="header">


                <div className="text-box" id="home">
                    <h1>HKFreelancer</h1>
                    <p>Welcome {userName}</p>
                    <a href="/employerCreateJobPage" className="Homebtn">Post A Job</a>
                </div>
            </section>
            <div className="jobCard">
            {employerJobState.length > 0 && employerJobState
                    .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                    )
                    .map((employerJob, index) =>
                        <EmployerHomeCard
                            key={index}
                            employerJob={employerJob}
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
                {/* {employerJobState.length > 0 ? employerJobState.map((employerJob, index) => (
                    <EmployerHomeCard
                        key={index}
                        employerJob={employerJob}
                    />
                )) : "loading..."} */}
            </div>
        </div>
    )
};

export default EmployerHomePage;