import React from "react";
import { Card, Badge } from 'react-bootstrap';

const ApplicantOfferCard = (props)=>{

    const {offerCard} = props;
    const {job_title, er_name, created_at, job_type, job_location, er_img_data,offer} = offerCard;
    console.log("testoffer",offer)

    return(
    <Card className='my-4'>
    <Card.Body onClick={() => console.log("offer clicked?")}>
        <div className="d-flex justify-content-between" >
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {created_at}
                </Card.Subtitle>
                <div className="flex">Offer {offer}</div>
                <Badge className="job-list-badge" variant="secondary">{job_type}</Badge>
                <Badge className="job-list-badge" variant="secondary">{job_location}</Badge>

            </div>
        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test"/>:<p></p>}
        </div>
    </Card.Body>
</Card>)
}
export default ApplicantOfferCard;