import React, { Component } from 'react';
import { Button } from 'reactstrap';
import styles from '../style.css';

export class ButtonPanel extends Component {
  onClickAdd = () => {
    const { text } = this.props.formPanel;
    const { token } = this.props.loginUser;
    if (text) {
      this.props.addNewTodo(text, token);
      this.props.formPanelUpdate('');
    }
  }

  onClickClear = () => {
    const { text } = this.props.formPanel;
    if (text) {
      this.props.formPanelUpdate('');
    }
  }

  onClickLogout = () => {
    this.onClickClear();
    this.props.logoutUser();
  }

  render() {
    return (
      <div className={styles.flexCenter}>
        <div className={styles.flexContainer}>
          <Button
            className={styles.fixedHeight}
            onClick={this.onClickAdd}
            color='success'
            type='submit'
          >Add Todo</Button>
          <Button
            className={styles.fixedHeight}
            onClick={this.onClickClear}
            color='warning'
          >Clear Text</Button>
          <Button
            className={styles.fixedHeight}
            onClick={this.onClickLogout}
          >Logout</Button>
        </div>
      </div>
    );
  }

}