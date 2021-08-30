import React, { useState, useEffect } from "react";

const SignUp = (props) => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const SignUp = () => {
   console.log("running "+email+" "+password);
  };

  return (
    <div className="container">
      <div class="row ">
    <div className="card col align-self-center">
      <label>
        Email:
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="text"
          value={email}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="text"
          value={password}
        />
      </label>
      <br />
      <button onClick={SignUp}>SignUp</button>
      <br></br>
      <a href="/applicantLogin">Log In</a>
    </div>
    <div className="col align-self-center"> Free Lancer testing para<br></br>owuhgwoghwopegb<br></br>wiugfw9peifhoqoe</div>
    </div>
    </div>
  );
};

export default SignUp;