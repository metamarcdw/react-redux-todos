import { connect } from 'react-redux';
import {
  loginFormUpdate,
  clearLoginForm,
  loginUser,
  registerUser
} from '../actions/actions';
import { LoginForm } from '../components';

const mapStateToProps = state => {
  const { usernameText, passwordText } = state.loginForm;
  return { usernameText, passwordText };
};

const mapDispatchToProps = dispatch => ({
  loginFormUpdate: (u, p) => dispatch(loginFormUpdate(u, p)),
  clearLoginForm: () => dispatch(clearLoginForm()),
  loginUser: (u, p) => dispatch(loginUser(u, p)),
  registerUser: (u, p) => dispatch(registerUser(u, p))
});

export const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
