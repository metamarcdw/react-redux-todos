import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

export class FormPanel extends Component {

  static propTypes = {
    text: PropTypes.string,
    formPanelUpdate: PropTypes.func.isRequired
  };

  onTextChange = e => {
    const { formPanelUpdate } = this.props;
    formPanelUpdate(e.target.value);
  };

  render() {
    const { text } = this.props;
    return (
      <FormGroup>
        <Label for='textInput'>Enter new todo text:</Label>
        <Input
          onChange={this.onTextChange}
          value={text}
          id='textInput'
          placeholder='What to do?' />
      </FormGroup>
    );
  }

}
