import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { RingLoader } from 'react-spinners';
import FontAwesomeIcon from 'react-fontawesome';
import '../style.css';

export class TodoList extends Component {

  static propTypes = {
    token: PropTypes.string.isRequired,
    todos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    fetchAllTodos: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { token, fetchAllTodos } = this.props;
    fetchAllTodos(token);
  }

  onClickComplete = todo => {
    const { token, completeTodo } = this.props;
    return () => {
      if (!todo.complete)
        completeTodo(todo.id, token);
    };
  }

  onClickDelete = todo => {
    const { token, deleteTodo } = this.props;
    return () => {
      let shouldDelete = true;
      if (!todo.complete && !window.confirm('Delete incomplete Todo?'))
        shouldDelete = false;
      if (shouldDelete)
        deleteTodo(todo.id, token);
    };
  }

  renderSpinner = () => (
    <div className='flexCenter'>
      <RingLoader
        color='#999'
        size={42}
        loading={true} />
      Loading..
    </div>
  );

  renderCheckmark = () => (
    <div className='flexColumn flexCenter margin'>
      <FontAwesomeIcon
        name='check-circle'
        size='2x'
        className='greenText' />
    </div>
  );

  renderListItem = todo => (
    <ListGroupItem
      className='d-flex flexCenter'
      key={todo.id}
    >
      {todo.complete ? this.renderCheckmark() : null}
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
    const { todos, loading, error } = this.props;
    return (
      <div>
        <ListGroup>
          {todos.map(this.renderListItem)}
        </ListGroup>
        <span className='redText'>{error}</span>
        {loading ? this.renderSpinner() : null}
      </div>
    );
  }

}