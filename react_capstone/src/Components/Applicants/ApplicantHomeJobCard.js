import React from "react";
import { Card, Badge } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const ApplicantHomeCard = (props) => {
    const dispatch = useDispatch();
    const { applicantJob } = props;
    const { job_id,job_title, er_name, created_at, job_type, job_location, er_img_data } = applicantJob;
    const { loadSearchIndJobThunkAction } = bindActionCreators(actionCreators, dispatch)
   
    const history = useHistory();
    function handleOnClick () {
 
        console.log('clicked', job_id)
        localStorage.setItem('job',job_id)
        loadSearchIndJobThunkAction(job_id).then(()=>{
        history.push('/applicantJobDetail')
      })
    }

    //date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card className='my-4' style={{ width: "70%" }} onClick={handleOnClick}>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Card.Title>
                                {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                            </Card.Title>
                            <Card.Subtitle className="text-muted mb-2">
                            {day + "/" + month + "/" + year}
                            </Card.Subtitle>
                            <Badge className="job-list-badge" variant="secondary">{job_type}</Badge>
                            <Badge className="job-list-badge" variant="secondary" style={{marginLeft:"5px"}}>{job_location}</Badge>
                                
                        </div>
                        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test" /> : <p></p>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default ApplicantHomeCard;