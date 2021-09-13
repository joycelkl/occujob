import React , {useEffect}from "react";
import authAxios from '../../Redux/authAxios';
import {Card, Badge} from 'react-bootstrap';
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ApplicantOfferCard = (props)=>{
    const dispatch = useDispatch();
    const { offerAcceptAction } = bindActionCreators(actionCreators, dispatch)
    
    
    const {offerCard, key} = props;
    console.log(key)

    const {reply,job_title,job_id, er_name, created_at, job_type, job_location, er_img_data,offer,job_description,work_period, expect_salary, req_exp, application_id} = offerCard;
    console.log("testoffer",offer)
    console.log('data', job_title,job_id, er_name, created_at, job_type, job_location, er_img_data,offer,job_description,work_period, expect_salary, req_exp, application_id)
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    // const [post, setPost] = useState(null);

//offer accept reject
    // async function acceptoffer(application_id){
    //     console.log("offer app ID",application_id)
    //     const authAxiosConfig = await authAxios();
    //     return await authAxiosConfig.post(`/employee/offer/accept/${application_id}`)
    //     .then(res => {
    //        console.log(res)
    //     }).catch(err => {
    //         console.log("pubulic job load err res", err.response)
    //     })
    // }
    async function declineoffer(application_id){
        console.log("offer app ID",application_id)
        const authAxiosConfig = await authAxios();
        return await authAxiosConfig.post(`/employee/offer/decline/${application_id}`)
        .then(res => {
           console.log(res)
        }).catch(err => {
            console.log("pubulic job load err res", err.response)
        })
    }

//date format
    let date = new Date(created_at)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return(
    <Card className='my-4'>
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
                <Badge className="job-list-badge" variant="secondary">{job_type}</Badge>
                <Badge className="job-list-badge" variant="secondary">{job_location}</Badge>

            </div>
        {er_img_data ? <img className="d-none d-md-block" height="100" src={er_img_data} alt="test"/>:<p></p>}
        </div>
    </Card.Body>
    <div>
      <Modal isOpen={modal} toggle={toggle} fade={false}>
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
            {reply === null ? <Button color="primary" onClick={()=>offerAcceptAction(application_id)}>accept</Button> : null }
            {reply === null ? <Button color="primary" onClick={()=>declineoffer(application_id)}>decline</Button> : null }
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
</Card>)
}
export default ApplicantOfferCard;