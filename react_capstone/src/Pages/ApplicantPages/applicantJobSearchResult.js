import React, { useState, useEffect } from "react";

import Job from "../Components/Job";

const applicantJobSearchResult = ()=>{
return(
<div>
  <h1>Search Result</h1>
  <ul>
    <Job/>
  </ul>
</div>
  );
}


export default applicantJobSearchResult;