import React, { useState, useEffect } from "react";

import Job from "../Components/Job";

const applicantOfferList = ()=>{
return(
<div>
  <h1>Offer List</h1>
  <ul>
    <Job/>
  </ul>
</div>
  );
}





export default applicantOfferList;