import { App } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser
  }
};

export const AppContainer = connect(
  mapStateToProps
)(App);
