import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { RingLoader } from 'react-spinners';
import FontAwesomeIcon from 'react-fontawesome';
import '../style.css';

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
      if (!todo.complete && !window.confirm('Delete incomplete Todo?'))
        shouldDelete = false;
      if (shouldDelete)
        this.props.deleteTodo(todo.id, token);
    };
  }

  renderSpinner = () => (
    <div className='flexCenter'>
      <RingLoader
        color='#999'
        loading={true} />
    </div>
  );

  renderCheckmark = todo => {
    if (todo.complete) {
      return (
        <div className='flexColumn flexCenter margin'>
          <FontAwesomeIcon
            name='check-circle'
            size='2x'
            className='greenText' />
        </div>
      );
    }
    return null;
  }

  renderListItem = todo => (
    <ListGroupItem
      className='flexCenter'
      key={todo.id}
    >
      {this.renderCheckmark(todo)}
      <div className='listItem'>
        {todo.text}
      </div>
      <Button
        className='fixedHeight margin'
        color='primary'
        onClick={this.onClickComplete(todo)}
        disabled={todo.complete}
      >Complete</Button>
      <Button
        className='fixedHeight'
        color='danger'
        onClick={this.onClickDelete(todo)}
      >Delete</Button>
    </ListGroupItem>
  );

  render() {
    const { todoList } = this.props;
    if (todoList.loading)
      return this.renderSpinner();

    return (
      <div>
        <ListGroup>
          {todoList.todos.map(this.renderListItem)}
        </ListGroup>
        <span className='redText'>{todoList.error}</span>
      </div>
    );
  }

}