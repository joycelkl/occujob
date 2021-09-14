import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import '../ApplicantPages/search.css'


const EmployerApplicantSearchList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loadApplicantSearchProfileThunkAction } = bindActionCreators(
        actionCreators,
        dispatch
    );
    const {erAppSearch } = bindActionCreators(actionCreators, dispatch)

    const appSearchState = useSelector((state) => state.applicantSearch);
    console.log('applicant search result', appSearchState)

    function handleOnclick(Id) {
        loadApplicantSearchProfileThunkAction(Id).then(() => {
            history.push('/employerSearchApplicantProfile')
        })
    }

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
                    <a href="/employerApplicantSearch" className="searchResultsHomebtn">Search Jobs</a>
                </div>
            </section>
            <div className="row" style={{ display: "flex", justifyContent: "center" }}>


                <Table striped style={{ width: "90%", }}>
                    <thead>
                        <tr>
                            <th>Applicant's Name</th>
                            <th>Job Function</th>
                            <th>Expected Salary</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>{appSearchState.length > 0 && appSearchState.map((result) => (
                            <tr onClick={() => handleOnclick(result.ee_id)} key={result.ee_id} value={result.ee_id} style={{ cursor: "pointer" }} >
                                <td>{result.ee_name}</td>
                                <td>{result.ee_industry}</td>
                                <td>{result.expected_Salary}</td>
                                <td>{result.availability}</td>
                            </tr>

                        ))}
                    </tbody>
                </Table>

            </div>

        </div>

    )
};

export default EmployerApplicantSearchList;