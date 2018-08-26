import { App } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { loggedIn, error } = state.loginUser;
  return { loggedIn, error };
};

export const AppContainer = connect(mapStateToProps)(App);
