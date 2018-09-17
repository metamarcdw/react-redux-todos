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
    const { text, token, addNewTodo } = this.props;
    addNewTodo(text, token);
    this.onClickClear();
  }

  onClickClear = () => {
    const { text, formPanelUpdate } = this.props;
    if (text) {
      formPanelUpdate('');
    }
  }

  onClickLogout = () => {
    this.props.logoutUser();
    this.onClickClear();
  }

  render() {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-around w-75'>
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