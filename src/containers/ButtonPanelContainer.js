import { connect } from 'react-redux';
import { addNewTodo, formPanelUpdate, logoutUser } from '../actions/actions';
import { ButtonPanel } from '../components';

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser,
    formPanel: state.formPanel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewTodo: (tx, to) => dispatch(addNewTodo(tx, to)),
    formPanelUpdate: t => dispatch(formPanelUpdate(t)),
    logoutUser: () => dispatch(logoutUser())
  };
};

export const ButtonPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonPanel);
