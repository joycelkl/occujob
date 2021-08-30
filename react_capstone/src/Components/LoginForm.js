import React, { useState, useEffect } from "react";

const Login = (props) => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
   console.log("running "+email+" "+password);
  };

  return (
    <div className="container">
      <div class="row">
    <div className="card col">
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
      <button onClick={login}>Login</button>
      <br></br>
      <a href="/employerSignup">SignUp</a>
      
    </div>
    <div className="col align-self-center"> Free Lancer testing para</div>
    </div>
    </div>
  );
};

export default Login;