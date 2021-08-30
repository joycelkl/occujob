import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Login = (props) => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
   console.log("running "+email+" "+password);
  };

  return (
    <div className="container">
      <div class="row">
    <Form className="col">
    <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)}
          value={email}/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)}
          value={password}/>
      </FormGroup>
      <Button onClick={login}>Login</Button>
      <a href="/employerSignup">SignUp</a>
    </Form>
    <div className="col align-self-center"> Free Lancer testing para</div>
    </div>
    </div>
  );
};

export default Login;