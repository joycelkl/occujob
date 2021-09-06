import React from "react";
import { Card } from 'react-bootstrap';

const HomeCard = ()=>{

    const {homeJobCard} = props;
    const {job_title, er_name, created_at} = homeJobCard;

    return(
    <Card className='my-4'>
    <Card.Body>
        <div className="d-flex justify-content-between">
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {created_at}
                </Card.Subtitle>
                
            </div>
        <img className="d-none d-md-block" height="100" src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" alt="test"/>
        </div>
    </Card.Body>
</Card>)
}
export default HomeCard;