import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";

const EmployerApplicantSearchList = () => {
    return (
        <div>
            <EmployerNavbar />
            <div className="row">


                <Table striped>
                    <thead>
                        <tr>
                            <th>Applicant's Name</th>
                            <th>Job Function</th>
                            <th>Expected Salary</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John  Doe</td>
                            <td>HR Manager</td>
                            <td>$21000</td>
                            <td>Weekends</td>
                        </tr>
                        <tr>
                            <td>Jacob Thornton</td>
                            <td>Marketing Executive</td>
                            <td>$22000</td>
                            <td>Monday-Friday</td>
                        </tr>
                        <tr>
                            <td>Larry Bird</td>
                            <td>Photographer</td>
                            <td>$23000</td>
                            <td>Monday-Friday</td>
                        </tr>
                        <tr>
                            <td>John  Doe</td>
                            <td>HR Manager</td>
                            <td>$21000</td>
                            <td>Weekends</td>
                        </tr>
                        <tr>
                            <td>Jacob Thornton</td>
                            <td>Marketing Executive</td>
                            <td>$22000</td>
                            <td>Monday-Friday</td>
                        </tr>
                        <tr>
                            <td>Larry Bird</td>
                            <td>Photographer</td>
                            <td>$23000</td>
                            <td>Monday-Friday</td>
                        </tr>
                    </tbody>
                </Table>

            </div>
       
        </div>

    )
};

export default EmployerApplicantSearchList;