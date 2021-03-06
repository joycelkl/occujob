import React from "react";
import "../Pages/EmployerPages/employerProfilePage.css"



const JobDetailPortfolioTable = (props) => {
    return (
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{width:"700px"}}>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" onClick={props.aboutHandler} style={{cursor:"pointer"}}>About</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.contactHandler} style={{cursor:"pointer"}}>Detail</p>
                  </li>
               

                </ul>
        </div>
    )
}

export default JobDetailPortfolioTable;