import React from "react";
import {Card, Badge} from 'react-bootstrap';
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ApplicantOfferCard = (props)=>{

    const {offerCard} = props;
    const {job_title, er_name, created_at, job_type, job_location, er_img_data,offer} = offerCard;
    console.log("testoffer",offer)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return(
    <Card className='my-4'>
    <Card.Body onClick={() => setModal(!modal)}>
        <div className="d-flex justify-content-between" >
            <div>
                <Card.Title>
                    {job_title} - <span className="text-muted font-weight-light">{er_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {created_at}
                </Card.Subtitle>
                {offer? <p className="flex" style={{backgroundColor:"green"}}>0</p>: <p></p>}
                <Badge className="job-list-badge" variant="secondary">{job_type}</Badge>
                <Badge className="job-list-badge" variant="secondary">{job_location}</Badge>

            </div>
        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test"/>:<p></p>}
        </div>
    </Card.Body>
    <div>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{job_title}</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
</Card>)
}
export default ApplicantOfferCard;