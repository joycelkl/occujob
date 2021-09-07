import React, { useEffect } from 'react';
import EmployerNavbar from "../../Components/Navbar/navbarEmployer";
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import EmployerJobRecordCard from '../../Components/Employer/EmployerJobRecordCard';


const EmployerJobRecordsList = () => {

    const employerJobState = useSelector((state) => state.employerJob)
    const dispatch = useDispatch();

    const { erJobRecordAction } = bindActionCreators(actionCreators, dispatch)

    useEffect(() => {
        erJobRecordAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('employer Job', employerJobState)


    return (
        <div>
            <EmployerNavbar />
            <div className="jobCard">
                {employerJobState.map(job => <EmployerJobRecordCard key={job.job_id} job={job}/>)}
            </div>
        </div>
    )
};

export default EmployerJobRecordsList;