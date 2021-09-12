import React from "react";
import { Card, Badge } from 'react-bootstrap';
//from Arthur to make a Job detail item for home page card, Job search result etc

import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';


const Job= (props)=>{

    const {job_id, job_title, er_name, created_at, job_type, job_location} = props.job
 
    
    const dispatch = useDispatch();
  
    const { loadSearchIndJobThunkAction } = bindActionCreators(actionCreators, dispatch)
  
    const history = useHistory();

    function handleOnClick () {
 
        console.log('clicked', job_id)
      loadSearchIndJobThunkAction(job_id).then(()=>{
        history.push('/applicantJobDetail')
      })
    }

    return(
    <Card className='my-4'>
    <Card.Body onClick={handleOnClick}>
        <div className="d-flex justify-content-between">
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    Posted on {created_at}
                </Card.Subtitle>
                
                <Badge className="job-list-badge" variant="secondary">{job_type}</Badge>
                <Badge className="job-list-badge2" variant="secondary">{job_location}</Badge>
                
            </div>
        <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test"/>
        </div>
    </Card.Body>
</Card>)
}
export default Job;