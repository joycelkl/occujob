import React from "react";
import { Card, Badge} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';

const HomeCard = (props) => {

    const { publicJob } = props;
    const { job_title, er_name, created_at, er_img_data, expect_salary, job_type } = publicJob;

//signup toast:
const signupToast = () => toast("Please Sign In To View More Details")

const history = useHistory();

//sign up handle
function handleOnClick () {
    history.push('/applicantLogin')
    signupToast()
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
                            <Card.Subtitle className="text-muted mb-2" style={{marginTop:'5px'}}>
                                {day + "/" + month + "/" + year}
                            </Card.Subtitle>
                            <Badge className="job-list-badge" variant="secondary" style={{height:'20px'}}>{job_type}</Badge>
                            <Badge className="job-list-badge" variant="secondary" style={{marginLeft:"5px", height:'20px'}}>${expect_salary}</Badge>
                            
                            <Card.Subtitle className="text-muted mb-2" style={{marginTop:'10px', textDecoration:'underline'}}> Please Sign In To View More Details</Card.Subtitle>
                        </div>
                        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test" /> : <p></p>}
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
export default HomeCard;