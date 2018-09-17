import { App } from '../components';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { loading, loggedIn, error } = state.loginUser;
  return { loading, loggedIn, error };
};

export const AppContainer = connect(mapStateToProps)(App);
