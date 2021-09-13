import React, { useEffect } from "react";
import { Card, Badge } from 'react-bootstrap';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

const ApplicantOfferCard = (props) => {
        //toast
        const acceptToast = () => toast("You Have Accepted This Offer")
        const declineToast = () => toast("You Have Declined This Offer")

        const dispatch = useDispatch();
        const { offerAcceptAction } = bindActionCreators(actionCreators, dispatch)
        const { offerDeclineAction } = bindActionCreators(actionCreators, dispatch)

        const { offerCard } = props;
        const { reply, job_title, job_id, er_name, created_at, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp, application_id } = offerCard;

        console.log("testoffer", offer)
        console.log('data', job_title, job_id, er_name, created_at, job_type, job_location, er_img_data, offer, job_description, work_period, expect_salary, req_exp, application_id)
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);




        function handleAccept() {
            console.log('application id', application_id)
            offerAcceptAction(application_id)
        }

        function handleDecline() {
            console.log('application id', application_id)
            offerDeclineAction(application_id)
        }


        //date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return(
        <div style={{ display: "flex", justifyContent: "center" }}>

    <Card className='my-4' style={{ width: "70%" }}>
    <Card.Body onClick={() => setModal(!modal)}>
        <div className="d-flex justify-content-between" >
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {day + "/" + month + "/" + year}
                </Card.Subtitle>
                {offer? <p className="flex" style={{backgroundColor:"green"}}>{String(offer)}</p>: <p></p>}
                <Badge className="job-list-badge" variant="secondary" style={{marginRight:'5px'}}>{job_type}</Badge>
                <Badge className="job-list-badge" variant="secondary">{job_location}</Badge>
                </div>
        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test"/>:<p></p>}
        </div>
    </Card.Body>
    <div>
      <Modal isOpen={modal} toggle={toggle} fade={false} >
        <ModalHeader toggle={toggle}>{job_title}{er_name} ID:{job_id} </ModalHeader>
        <ModalBody style={{width:"100%", height:"100%"}}>
        Type: {job_type}<br/>
        Job Description: {job_description}<br/>
        Work Time: {work_period}<br/>
        Working Location: {job_location}<br/>
        Salary: {expect_salary}<br/>
        Required Exp: {req_exp}<br/>
        </ModalBody>
        <ModalFooter>
            {reply === null ? <Button color="primary" onClick={()=>handleAccept()}>accept</Button> : null }
            {reply === null ? <Button color="primary" onClick={()=>handleDecline()}>decline</Button> : null }
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        <ToastContainer />
      </Modal>
    </div>
</Card>
</div>
)
}
export default ApplicantOfferCard;