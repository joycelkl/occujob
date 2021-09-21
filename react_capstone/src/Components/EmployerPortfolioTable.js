import React from "react";
import "../Pages/EmployerPages/employerProfilePage.css"



const EmployerPortfolioTable = (props) => {
    return (
        <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                   
                    <p className="nav-link active" id="home-tab" onClick={props.aboutHandler} style={{cursor:"pointer"}}>About</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.contactHandler} style={{cursor:"pointer"}}>Contact</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.commentsHandler} style={{cursor:"pointer"}}>Your Reviews</p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" id="home-tab" data-toggle="tab" onClick={props.employerReviewsHandler} style={{cursor:"pointer"}}>Your Posts</p>
                  </li>
                  

                </ul>
        </div>
    )
}

export default EmployerPortfolioTable;