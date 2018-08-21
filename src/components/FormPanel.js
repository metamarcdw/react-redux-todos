import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export const FormPanel = props => {
  const onTextChange = e => {
    props.formPanelUpdate(e.target.value);
  };

  return (
    <FormGroup>
      <Label for='textInput'>Enter new todo text:</Label>
      <Input
        onChange={onTextChange}
        value={props.formPanel.text}
        id='textInput'
        placeholder='What to do?' />
    </FormGroup>
  );
};