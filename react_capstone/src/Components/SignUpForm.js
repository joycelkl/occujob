import React, { useState, useEffect } from "react";

const SignUp = (props) => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const SignUp = () => {
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
      <button onClick={SignUp}>SignUp</button>
      <br></br>
      <a href="/login">Log In</a>
    </div>
  );
};

export default SignUp;