import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../style.css';

export class LoginForm extends Component {

  static propTypes = {
    usernameText: PropTypes.string,
    passwordText: PropTypes.string,
    loginFormUpdate: PropTypes.func.isRequired,
    clearLoginForm: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
  };

  onInputChange = e => {
    this.props.loginFormUpdate(e.target.id, e.target.value);
  }

  onSubmitLogin = e => {
    const { usernameText, passwordText, clearLoginForm, loginUser } = this.props;
    if (usernameText && passwordText) {
      clearLoginForm();
      loginUser(usernameText, passwordText);
    }
    e.preventDefault();
  }

  onClickRegister = () => {
    const { usernameText, passwordText, clearLoginForm, registerUser } = this.props;
    if (usernameText && passwordText) {
      clearLoginForm();
      registerUser(usernameText, passwordText);
    }
  }

  render() {
    const { usernameText, passwordText } = this.props;
    return (
      <Form className='p-4' onSubmit={this.onSubmitLogin}>
        <FormGroup>
          <Label for='usernameText'>Enter your username</Label>
          <Input
            onChange={this.onInputChange}
            value={usernameText}
            placeholder='Your Username'
            id='usernameText' />
        </FormGroup>
        <FormGroup>
          <Label for='passwordText'>Enter your password</Label>
          <Input
            onChange={this.onInputChange}
            value={passwordText}
            type='password'
            id='passwordText' />
        </FormGroup>
        <Button
          className='fixedHeight ml-2 mr-4'
          type='submit'
        >Login</Button>
        <Button
          className='fixedHeight'
          onClick={this.onClickRegister}
        >Register</Button>
      </Form>
    );
  }

}