import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Table, Button } from 'reactstrap';
import "../Pages/EmployerPages/employerProfilePage.css"



const EmployerPortfolioTable = (props) => {
    return (
        <div>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                   
                    <p class="nav-link active" id="home-tab" onClick={props.aboutHandler} style={{cursor:"pointer"}}>About</p>
                  </li>
                  <li class="nav-item">
                    <p class="nav-link active" id="home-tab" data-toggle="tab" onClick={props.contactHandler} style={{cursor:"pointer"}}>Contact</p>
                  </li>
                  

                </ul>
        </div>
    )
}

export default EmployerPortfolioTable;