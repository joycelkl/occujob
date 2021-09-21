import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../Redux";
import { useHistory } from "react-router";

const EmployerJobRecordCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loadIndJobThunkAction } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const { job_title, created_at, expiry_date, status, job_id, er_img_data } =
    props.job;
  console.log("props", props.job);

  function handleOnclick () {
    console.log('clicked', job_id)
    localStorage.setItem('job',job_id)
    loadIndJobThunkAction(job_id).then(()=>{
        history.push('/employerEditPost')
    })
}
//date format
let createDate = new Date(created_at)
    let cday = createDate.getDate();
    let cmonth = createDate.getMonth() + 1;
    let cyear = createDate.getFullYear();

let expDate = new Date(expiry_date)
    let eday = expDate.getDate();
    let emonth = expDate.getMonth() + 1;
    let eyear = expDate.getFullYear();
    
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className="my-4" onClick={handleOnclick} style={{ width: "70%", cursor:'pointer' }}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>{job_title}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                {cday + "/" + cmonth + "/" + cyear} (DOP)
                </Card.Subtitle>
                <Card.Subtitle className="text-muted mb-2">
                {eday + "/" + emonth + "/" + eyear} (EXP)
                </Card.Subtitle>

                <Badge className="job-list-badge" variant="secondary">
                  {status ? "Active" : "Inactive"}
                </Badge>
                <Card.Subtitle className="text-muted mb-2" style={{marginTop:'10px', textDecoration:'underline'}}> Click To View Job Details </Card.Subtitle>
              </div>
              {er_img_data ? (
                <img
                  className="d-none d-md-block"
                  height="100"
                  src={er_img_data}
                  alt="test"
                />
              ) : (
                <p></p>
              )}{" "}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};


export default EmployerJobRecordCard;
