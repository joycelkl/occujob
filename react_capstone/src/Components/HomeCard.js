import React from "react";
import { Card } from 'react-bootstrap';

const HomeCard = (props) => {

    const { publicJob } = props;
    const { job_title, er_name, created_at, er_img_data } = publicJob;


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
                            <Card.Subtitle className="text-muted mb-2">
                                {day + "/" + month + "/" + year}
                            </Card.Subtitle>


                        </div>
                        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test" /> : <p></p>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default HomeCard;