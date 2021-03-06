import React, {useEffect} from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ApplicantOfferCard from "../../Components/Applicants/ApplicantOfferCard";
import 'react-toastify/dist/ReactToastify.css';
import './applicantOfferList.css';
import "../EmployerPages/modalFullPage.css";
import 'react-toastify/dist/ReactToastify.css';



const ApplicantOfferList = ()=>{
 
  const EEOfferState = useSelector((state) => state.EEOffer)
  const dispatch = useDispatch();

  const { loadOfferThunkAction } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    loadOfferThunkAction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


    return(
    <div>
    <ApplicantNavbar />
    <section className="offerListHeader">


    <div className="offerListText-box" id="home">
        <h1>Job Records</h1>
        <p>Apply For Your Job!</p>
        <a href="/applicantJobSearch" className="Homebtn">Search Jobs</a>
    </div>
    </section>
      <div className="jobCard">
                    {EEOfferState.length > 0 ? EEOfferState.map((EEOffer, index) => (
                        <ApplicantOfferCard
                            key={index}
                            offerCard={EEOffer}
                        />
                    )) : <h1 style={{display:"flex", justifyContent:'center', marginTop:'15vh'}}>Please Apply For Your First Job</h1>}
                </div>
              
    </div>
      );
 }

export default ApplicantOfferList;