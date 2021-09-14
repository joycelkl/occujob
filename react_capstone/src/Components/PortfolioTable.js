import React from "react";
import "../Pages/EmployerPages/employerProfilePage.css"



const ApplicantPortfolioTable = (props) => {
    return (
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                    {/* {show ? <h1>Hello World </h1> : null} */}
                    <p class="nav-link active" id="home-tab" onClick={props.aboutHandler} style={{cursor:"pointer"}}>About</p>
                  </li>
                  <li class="nav-item">
                    <p class="nav-link active" id="home-tab" data-toggle="tab" onClick={props.contactHandler} style={{cursor:"pointer"}}>Contact</p>
                  </li>
                  <li class="nav-item">
                    <p class="nav-link active" id="home-tab" data-toggle="tab" onClick={props.jobPreferenceHandler} style={{cursor:"pointer"}}>Job Preferences</p>
                  </li>
                  <li class="nav-item">
                    <p class="nav-link active" id="home-tab" data-toggle="tab" onClick={props.portfolioHandler} style={{cursor:"pointer"}}>Portfolio</p>
                  </li>

                </ul>
        </div>
    )
}

export default ApplicantPortfolioTable;