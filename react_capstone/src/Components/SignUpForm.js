import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const SignUp = (props) => {

  const {onEmailChange, onPasswordChange, handleRegister, email, password, name, onNameChange, type} = props

  return (
    <div>
      <div className="container">
        <div class="row">
          <Form className="form-group" onSubmit={(e)=>handleRegister(e)}>
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
            <Button type='submit'>SignUp</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;