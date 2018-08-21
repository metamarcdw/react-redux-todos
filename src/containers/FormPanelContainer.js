import { connect } from 'react-redux';
import { formPanelUpdate } from '../actions/actions';
import { FormPanel } from '../components';

const mapStateToProps = state => {
  return { formPanel: state.formPanel };
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
