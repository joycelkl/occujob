import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const SignUp = (props) => {

  const {onEmailChange, onPasswordChange, handleRegister, email, password, name, onNameChange, type} = props

  return (
    <div>
      <div className="container-fluid">
        <div class="row">
          <Form className="form-group" onSubmit={(e)=>handleRegister(e)} style={{ width: "100%", padding:"0", marginTop:"20px" }}>
          <FormGroup>
              <Label for="name">{type} Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name" onChange={(e) => onNameChange(e.currentTarget.value)}
                value={name} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="Email" onChange={(e) => onEmailChange(e.currentTarget.value)}
                value={email} />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={(e) => onPasswordChange(e.currentTarget.value)}
                value={password} />
            </FormGroup>
            <div className="signupButtons" style={{float: "right", marginTop:"40px"}}>

            <Button type='submit'>SignUp</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;