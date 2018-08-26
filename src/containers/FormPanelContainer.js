import { connect } from 'react-redux';
import { formPanelUpdate } from '../actions/actions';
import { FormPanel } from '../components';

const mapStateToProps = state => {
  const { text } = state.formPanel;
  return { text };
};

const mapDispatchToProps = dispatch => {
  return {
    formPanelUpdate: t => dispatch(formPanelUpdate(t))
  }
};

export const FormPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPanel);
