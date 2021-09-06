import React from "react";
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Login = (props) => {
 
  const {onEmailChange, onPasswordChange, handleLogin, email, password} = props


  return (
    <div className="container">
      <div className="row">
    <Form className="form-group" onSubmit={(e)=>handleLogin(e)}>
    <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={(e) => onEmailChange(e.currentTarget.value)}
          value={email}/>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={(e) => onPasswordChange(e.currentTarget.value)}
          value={password}/>
      </FormGroup>
      
      <Button type='submit'>Login</Button>
      
    </Form>
    </div>
    </div>
  );
};

export default Login;