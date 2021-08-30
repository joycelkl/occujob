import React, { useState, useEffect } from "react";

const Login = (props) => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = () => {
   console.log("running "+email+" "+password);
  };

  return (
    <div>
      <label>
        Username:
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
      <a href="/SignUp">SignUp</a>

    </div>
    
  );
};

export default Login;