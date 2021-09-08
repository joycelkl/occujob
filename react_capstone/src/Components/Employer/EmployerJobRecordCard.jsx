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

  function handleOnclick() {
    console.log("clicked", job_id);
    loadIndJobThunkAction(job_id).then(() => {
      history.push("/employerApplicantProfile");
    });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className="my-4" onClick={handleOnclick} style={{ width: "70%" }}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>{job_title}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  {created_at} (DOP)
                </Card.Subtitle>
                <Card.Subtitle className="text-muted mb-2">
                  {expiry_date} (EXP)
                </Card.Subtitle>

                <Badge className="job-list-badge" variant="secondary">
                  {status ? "Active" : "Inactive"}
                </Badge>
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
