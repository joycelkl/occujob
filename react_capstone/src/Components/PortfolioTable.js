import React from "react";
import "../Pages/EmployerPages/employerProfilePage.css"



const ApplicantPortfolioTable = (props) => {
    return (
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{width:"700px"}}>
                  <li className="nav-item">
                    {/* {show ? <h1>Hello World </h1> : null} */}
                    <p className="nav-link active" id="home-tab" onClick={props.aboutHandler} style={{cursor:"pointer"}}>About</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.contactHandler} style={{cursor:"pointer"}}>Contact</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.jobPreferenceHandler} style={{cursor:"pointer"}}>Job Preferences</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.portfolioHandler} style={{cursor:"pointer"}}>Portfolio</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.commentsHandler} style={{cursor:"pointer"}}>Applicant's Reivews</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.applicantReviewsHandler} style={{cursor:"pointer"}}>Your Posts</p>
                  </li>

                </ul>
        </div>
    )
}

export default ApplicantPortfolioTable;