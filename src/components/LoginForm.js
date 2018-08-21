import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from '../style.css';

export class LoginForm extends Component {
  onInputChange = e => {
    this.props.loginFormUpdate(e.target.id, e.target.value);
  }

  onSubmitLogin = e => {
    const { usernameText, passwordText } = this.props.loginForm;
    if (usernameText && passwordText) {
      this.props.clearLoginForm();
      this.props.loginUser(usernameText, passwordText);
    }
    e.preventDefault();
  }

  onClickRegister = () => {
    const { usernameText, passwordText } = this.props.loginForm;
    if (usernameText && passwordText) {
      this.props.clearLoginForm();
      this.props.registerUser(usernameText, passwordText);
    }
  }

  render() {
    return (
      <Form className={styles.padding} onSubmit={this.onSubmitLogin}>
        <FormGroup>
          <Label for="usernameText">Enter your username</Label>
          <Input
            onChange={this.onInputChange}
            value={this.props.loginForm.usernameText}
            placeholder="Your Username"
            id="usernameText" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordText">Enter your password</Label>
          <Input
            onChange={this.onInputChange}
            value={this.props.loginForm.passwordText}
            type="password"
            id="passwordText" />
        </FormGroup>
        <Button
          className={`${styles.fixedHeight} ${styles.margin}`}
          type="submit"
        >Login</Button>
        <Button
          className={styles.fixedHeight}
          onClick={this.onClickRegister}
        >Register</Button>
      </Form>
    );
  }

}