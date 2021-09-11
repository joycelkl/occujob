import React, {useEffect } from "react";
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
            <h1>Applicant Search Result</h1>
            {appSearchState.length > 0 ? 
             (<Table striped>
             <thead>
                 <tr>
                     <th>Applicant's Name</th>
                     <th>Job Function</th>
                     <th>Expected Salary</th>
                     <th>Availability</th>
                 </tr>
             </thead>
             <tbody>
                 <tr>
                     <td>John  Doe</td>
                     <td>HR Manager</td>
                     <td>$21000</td>
                     <td>Weekends</td>
                 </tr>
                 <tr>
                     <td>Jacob Thornton</td>
                     <td>Marketing Executive</td>
                     <td>$22000</td>
                     <td>Monday-Friday</td>
                 </tr>
                 <tr>
                     <td>Larry Bird</td>
                     <td>Photographer</td>
                     <td>$23000</td>
                     <td>Monday-Friday</td>
                 </tr>
                 <tr>
                     <td>John  Doe</td>
                     <td>HR Manager</td>
                     <td>$21000</td>
                     <td>Weekends</td>
                 </tr>
                 <tr>
                     <td>Jacob Thornton</td>
                     <td>Marketing Executive</td>
                     <td>$22000</td>
                     <td>Monday-Friday</td>
                 </tr>
                 <tr>
                     <td>Larry Bird</td>
                     <td>Photographer</td>
                     <td>$23000</td>
                     <td>Monday-Friday</td>
                 </tr>
             </tbody>
         </Table>) : <h3>Sorry, No match applicant at this moment.</h3>}
               
            </div>
       
        </div>

    )
};

export default EmployerApplicantSearchList;