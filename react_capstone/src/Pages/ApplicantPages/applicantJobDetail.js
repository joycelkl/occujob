import React, { useEffect } from "react";
import JobDetail from "../../Components/JobDetail";
import ApplicantNavbar from '../../Components/Navbar/navbarApplicant';
import { useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import { useDispatch } from 'react-redux';

const ApplicantJobDetail = () => {

  const jobDetailState = useSelector((state) => state.individualJob);
 

  const dispatch = useDispatch();
  
  const { loadSearchIndJobThunkAction } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    const job_id = localStorage.getItem('job')
    loadSearchIndJobThunkAction(job_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <ApplicantNavbar />
      <div>
        {jobDetailState.length >0 ? <JobDetail 
        indJob={jobDetailState}/>: null}

      </div>
    </div>
  );
}

export default ApplicantJobDetail;
