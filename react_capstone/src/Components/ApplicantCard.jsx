import React from 'react'
import { Card, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux";

const ApplicantCard = ({applicant}) => {

    const {ee_id, ee_name, ee_industry, expected_salary, ee_salary_type, availability} = applicant

    const history = useHistory();
    const dispatch = useDispatch();
    const { loadApplicantSearchProfileThunkAction } = bindActionCreators(actionCreators,dispatch);

    function handleOnclick() {
        localStorage.setItem('applicant', ee_id)
        loadApplicantSearchProfileThunkAction(ee_id).then(() => {
            history.push('/employerSearchApplicantProfile')
        })
    }

    return (
        <div className='container' style={{width: '70%'}}>
         <Card className='my-4' style={{ cursor: "pointer" }}>
            <Card.Body onClick={()=>handleOnclick()}>
        <div className="d-flex justify-content-between">
            <div>
                <Card.Title>
                    {ee_name} 
                
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    Expected Salary :  {ee_salary_type} - {expected_salary}
                </Card.Subtitle>
                <Badge className="job-list-badge" variant="secondary">Job Function : {ee_industry ? ee_industry.map((industry, index)=>{
                if (index === ee_industry.length-1) {
                    return industry
                } else {
                    return `${industry} / `
                }
            }) : null}</Badge>
              
                <Badge className="job-list-badge2" variant="secondary">Availability : {availability ? availability.map((available, index) => {
                if (index === availability.length-1) {
                    return available.charAt(0).toUpperCase() + available.slice(1)
                } else {
                    return `${available.charAt(0).toUpperCase() + available.slice(1)} / `
                }

            }): null}</Badge>
                
            </div>
        </div>
    </Card.Body>
</Card>            
        </div>
    )
}

export default ApplicantCard
