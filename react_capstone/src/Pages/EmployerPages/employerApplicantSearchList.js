import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import '../ApplicantPages/search.css'
import ApplicantCard from "../../Components/ApplicantCard";

const EmployerApplicantSearchList = () => {
  
    const dispatch = useDispatch();

    const {erAppSearch } = bindActionCreators(actionCreators, dispatch)

    const appSearchState = useSelector((state) => state.applicantSearch);
    console.log('applicant search result', appSearchState)

    useEffect(()=>{
 
        const retrievedObject = localStorage.getItem('appSearch');
        const parsed = JSON.parse(retrievedObject)
        console.log('parsed',parsed)
        const {available, jobFunction, expSalary, location, skills, salaryType, workExp} = parsed
        erAppSearch(available, jobFunction, expSalary, location, skills, salaryType, workExp)
     
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
        <div>
            <EmployerNavbar />
            <section className="searchResultsHeader">


                <div className="searchResultsText-box" id="home">
                    <h1>Search Results</h1>
                    <p>Find Your Next Applicant!</p>
                    <a href="/employerApplicantSearch" className="searchResultsHomebtn">Search Applicant</a>
                </div>
            </section>
            <div className="row" style={{ display: "flex", justifyContent: "center" }}>

            {appSearchState.length > 0 && appSearchState.map((applicant, index)=> <ApplicantCard key={index} applicant={applicant}/>)}

            </div>

        </div>

    )
};

export default EmployerApplicantSearchList;