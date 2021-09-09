import React , {useEffect}from "react";
import {Card, Badge} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useState } from "react";
import { actionCreators } from '../../Redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ApplicantOfferCard = (props)=>{
    const dispatch = useDispatch();
    const {offerCard} = props;
    const {job_title,job_id, er_name, created_at, job_type, job_location, er_img_data,offer,job_description,work_period, expect_salary, req_exp, application_id} = offerCard;
    console.log("testoffer",offer)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
//offer accept reject
    const {offerAcceptAction} = bindActionCreators(actionCreators, dispatch)
    useEffect(() => {
        offerAcceptAction();
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])


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
        <ModalHeader toggle={toggle}>{job_title}{er_name} ID:{job_id} </ModalHeader>
        <ModalBody>
        Type: {job_type}<br/>
        Job Description: {job_description}<br/>
        Work Time: {work_period}<br/>
        Working Location: {job_location}<br/>
        Salary: {expect_salary}<br/>
        Required Exp: {req_exp}<br/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" value= "accept" onClick={toggle}>accept</Button>{' '}
          <Button color="primary" onClick={toggle}>reject</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
</Card>)
}
export default ApplicantOfferCard;