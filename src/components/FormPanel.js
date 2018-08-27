import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

export const FormPanel = ({ text, formPanelUpdate }) => {

  const onTextChange = e => {
    formPanelUpdate(e.target.value);
  };

  return (
    <FormGroup>
      <Label for='textInput'>Enter new todo text:</Label>
      <Input
        onChange={onTextChange}
        value={text}
        id='textInput'
        placeholder='What to do?' />
    </FormGroup>
  );
};

FormPanel.propTypes = {
  text: PropTypes.string,
  formPanelUpdate: PropTypes.func.isRequired
};
