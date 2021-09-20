import React from "react";
import { Card, Badge } from 'react-bootstrap';

const EmployerHomeCard = (props) => {

    const { employerJob } = props;
    const { job_title, er_name, created_at, job_type, er_img_data } = employerJob;

    //date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card className='my-4' style={{ width: "70%" }}>
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Card.Title>
                                {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                            </Card.Title>
                            <Card.Subtitle className="text-muted mb-2" style={{marginTop:'5px'}}>
                            {day + "/" + month + "/" + year}
                            </Card.Subtitle>
                            <Badge className="job-list-badge" variant="secondary" style={{marginLeft:"5px", height:'20px'}}>{job_type}</Badge>
                            <Card.Subtitle className="text-muted mb-2" style={{marginTop:'10px', textDecoration:'underline'}}> Only Applicants Can View Job Details </Card.Subtitle>

                        </div>
                        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test" /> : <p></p>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default EmployerHomeCard;