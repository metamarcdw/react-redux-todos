import { connect } from 'react-redux';
import {
  addNewTodo,
  formPanelUpdate,
  logoutUser
} from '../actions';
import { ButtonPanel } from '../components';

const mapStateToProps = state => {
  const { text } = state.formPanel;
  const { token } = state.loginUser;
  return { text, token };
};

const mapDispatchToProps = dispatch => ({
  addNewTodo: (tx, to) => dispatch(addNewTodo(tx, to)),
  formPanelUpdate: t => dispatch(formPanelUpdate(t)),
  logoutUser: () => dispatch(logoutUser())
});

export const ButtonPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonPanel);
