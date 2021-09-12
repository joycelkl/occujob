import React from "react";
import { useDispatch,useSelector } from 'react-redux';
import {Table} from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";


const EmployerApplicantSearchList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loadApplicantSearchProfileThunkAction } = bindActionCreators(
      actionCreators,
      dispatch
    );
    const appSearchState = useSelector((state) =>state.applicantSearch);
    console.log ('applicant search result',appSearchState)
    
    function handleOnclick (Id) {
        loadApplicantSearchProfileThunkAction(Id).then(()=>{
            history.push('/employerSearchApplicantProfile')
        })}
    


    return (
        <div>
            <EmployerNavbar />
            <h1>Apllicants Search Result</h1>
            <div className="row">


                <Table striped>
                    <thead>
                        <tr>
                            <th>Applicant's Name</th>
                            <th>Job Function</th>
                            <th>Expected Salary</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                    {appSearchState.length>0?appSearchState.map((result) => (
                            <tr 
                            onClick={()=>handleOnclick(result.ee_id)} key={result.ee_id} value={result.ee_id}style={{ cursor: "pointer" }}>
                            
                                <td>{result.ee_name}</td>
                                <td>{result.ee_industry}</td>
                                <td>{result.expected_Salary}</td>
                                <td>{result.availability}</td>
                            </tr>

                        )) : "No Result"}
                    </tbody>
                </Table>

            </div>
       
        </div>

    )
};

export default EmployerApplicantSearchList;