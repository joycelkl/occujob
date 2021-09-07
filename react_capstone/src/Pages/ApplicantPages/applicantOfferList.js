import React, {useEffect} from "react";
import ApplicantNavbar from "../../Components/Navbar/navbarApplicant";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux';
import ApplicantOfferCard from "../../Components/Applicants/ApplicantOfferCard";

const ApplicantOfferList = ()=>{
  // return(
  //   <div>Underconstruction</div>
  // )
  const EEOfferState = useSelector((state) => {
    { console.log("Applicant Offer:", state.EEOffer) }
    return state.EEOffer
})
const dispatch = useDispatch();

const { loadOfferThunkAction } = bindActionCreators(actionCreators, dispatch)

useEffect(() => {
  loadOfferThunkAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

console.log('Offer', EEOfferState)

return(
<div>
<ApplicantNavbar />
  <h1>Application Record</h1>
  <div className="jobCard">
                {EEOfferState.length > 0 ? EEOfferState.map((EEOffer, index) => (
                    <ApplicantOfferCard
                        key={index}
                        offerCard={EEOffer}
                    />
                )) : "loading..."}
            </div>
</div>
  );
 }





export default ApplicantOfferList;