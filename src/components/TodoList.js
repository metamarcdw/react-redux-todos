import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { RingLoader } from 'react-spinners';
import FontAwesomeIcon from 'react-fontawesome';
import styles from '../style.css';

export class TodoList extends Component {
  componentDidMount() {
    const { token } = this.props.loginUser;
    this.props.fetchAllTodos(token);
  }

  onClickComplete = todo => {
    const { token } = this.props.loginUser;
    return () => {
      if (!todo.complete)
        this.props.completeTodo(todo.id, token);
    };
  }

  onClickDelete = todo => {
    const { token } = this.props.loginUser;
    return () => {
      let shouldDelete = true;
      if (!todo.complete && !window.confirm("Delete incomplete Todo?"))
        shouldDelete = false;
      if (shouldDelete)
        this.props.deleteTodo(todo.id, token);
    };
  }

  renderSpinner = () => {
    return (
      <div className={styles.flexCenter}>
        <RingLoader
          color="#999"
          loading={true} />
      </div>
    );
  }

  renderCheckmark = todo => {
    if (todo.complete) {
      return (
        <div className={`${styles.flexColumn} ${styles.flexCenter} ${styles.margin}`}>
          <FontAwesomeIcon
            name="check-circle"
            size="2x"
            className={styles.greenText} />
        </div>
      );
    }
    return null;
  }

  renderListItem = todo => {
    return (
      <ListGroupItem
        className={styles.flexCenter}
        key={todo.id}
      >
        {this.renderCheckmark(todo)}
        <div className={styles.listItem}>
          {todo.text}
        </div>
        <Button
          className={`${styles.fixedHeight} ${styles.margin}`}
          color="primary"
          onClick={this.onClickComplete(todo)}
          disabled={todo.complete}
        >Complete</Button>
        <Button
          className={styles.fixedHeight}
          color="danger"
          onClick={this.onClickDelete(todo)}
        >Delete</Button>
      </ListGroupItem>
    );
  }

  render() {
    const { todoList } = this.props;
    if (todoList.loading)
      return this.renderSpinner();

    return (
      <div>
        <ListGroup>
          {todoList.todos.map(this.renderListItem)}
        </ListGroup>
        <span className={styles.redText}>{todoList.error}</span>
      </div>
    );
  }

}