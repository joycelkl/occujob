import React from "react";
import { Card, Badge } from 'react-bootstrap';
//from Arthur to make a Job detail item for home page card, Job search result etc

import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';


const Job= (props)=>{

    const {job_id, job_title, er_name, created_at, job_type, job_location, er_img_data} = props.job
 
    
    const dispatch = useDispatch();
  
    const { loadSearchIndJobThunkAction } = bindActionCreators(actionCreators, dispatch)
  
    const history = useHistory();

    function handleOnClick () {
 
        console.log('clicked', job_id)
      loadSearchIndJobThunkAction(job_id).then(()=>{
        history.push('/applicantJobDetail')
      })
    }
    
    //date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return(
    <Card className='my-4'>
    <Card.Body onClick={handleOnClick}>
        <div className="d-flex justify-content-between">
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    Posted on {day + "/" + month + "/" + year}
                </Card.Subtitle>
                
                <Badge className="job-list-badge" variant="secondary">{job_type}</Badge>
                <Badge className="job-list-badge2" variant="secondary">{job_location}</Badge>
                
            </div>
            {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test" /> : <p></p>}
        </div>
    </Card.Body>
</Card>)
}
export default Job;