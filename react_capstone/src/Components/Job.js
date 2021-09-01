import React from "react";
import { Card, Badge } from 'react-bootstrap';
//from Arthur to make a Job detail item for home page card, Job search result etc
const Job= ()=>{
    <Card className='my-4'>
    <Card.Body>
        <div className="d-flex justify-content-between">
            <div>
                <Card.Title>
                    Job Title - <span className="text-muted font-weight-light">Company Name</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    08/30/2021
                </Card.Subtitle>
                
                <Badge className="job-list-badge" variant="secondary">Full Time</Badge>
                <Badge className="job-list-badge2" variant="secondary">Central</Badge>
                
            </div>
        <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test"/>
        </div>
    </Card.Body>
</Card>
}
export default Job;