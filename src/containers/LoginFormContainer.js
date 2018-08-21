import { connect } from 'react-redux';
import {
  loginFormUpdate,
  clearLoginForm,
  loginUser,
  registerUser
} from '../actions/actions';
import { LoginForm } from '../components';

const mapStateToProps = state => {
  return { loginForm: state.loginForm };
};

const mapDispatchToProps = dispatch => {
  return {
    loginFormUpdate: (u, p) => dispatch(loginFormUpdate(u, p)),
    clearLoginForm: () => dispatch(clearLoginForm()),
    loginUser: (u, p) => dispatch(loginUser(u, p)),
    registerUser: (u, p) => dispatch(registerUser(u, p))
  };
};

export const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
