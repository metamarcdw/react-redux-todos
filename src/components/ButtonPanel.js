import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import '../style.css';

export class ButtonPanel extends Component {

  static propTypes = {
    text: PropTypes.string,
    token: PropTypes.string.isRequired,
    addNewTodo: PropTypes.func.isRequired,
    formPanelUpdate: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
  };

  onClickAdd = () => {
    const { text, token, addNewTodo, formPanelUpdate } = this.props;
    if (text) {
      addNewTodo(text, token);
      formPanelUpdate('');
    }
  }

  onClickClear = () => {
    const { text, formPanelUpdate } = this.props;
    if (text) {
      formPanelUpdate('');
    }
  }

  onClickLogout = () => {
    this.onClickClear();
    this.props.logoutUser();
  }

  render() {
    return (
      <div className='flexCenter'>
        <div className='flexContainer'>
          <Button
            className='fixedHeight'
            onClick={this.onClickAdd}
            color='success'
            type='submit'
          >Add Todo</Button>
          <Button
            className='fixedHeight'
            onClick={this.onClickClear}
            color='warning'
          >Clear Text</Button>
          <Button
            className='fixedHeight'
            onClick={this.onClickLogout}
          >Logout</Button>
        </div>
      </div>
    );
  }

}