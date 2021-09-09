import React , {useEffect}from "react";
import authAxios from '../../Redux/authAxios';
import {Card, Badge} from 'react-bootstrap';
import { useState } from "react";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ApplicantOfferCard = (props)=>{
    
    const {offerCard} = props;
    const {job_title,job_id, er_name, created_at, job_type, job_location, er_img_data,offer,job_description,work_period, expect_salary, req_exp, application_id} = offerCard;
    console.log("testoffer",offer)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [post, setPost] = useState(null);
//offer accept reject
    async function acceptoffer(application_id,reply){
        console.log("offer app ID",application_id)
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post(`/employee/accept/offer/${application_id}`,{reply:true})
        .then(res => {
           console.log("accepted")
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
        })
    }
   

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
          <Button color="primary" value= {application_id} onClick={acceptoffer}>accept</Button>{' '}
          <Button color="primary" onClick={toggle}>reject</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
</Card>)
}
export default ApplicantOfferCard;