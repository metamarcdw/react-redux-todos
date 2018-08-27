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

  onClickComplete = ({ id, complete }) => () => {
    const { token, completeTodo } = this.props;
    if (!complete)
      completeTodo(id, token);
  }

  onClickDelete = ({ id, complete }) => () => {
    const { token, deleteTodo } = this.props;
    if (complete || window.confirm('Delete incomplete Todo?'))
      deleteTodo(id, token);
  }

  renderSpinner = () => (
    <div className='d-flex justify-content-center align-items-center'>
      <RingLoader
        color='#999'
        size={42}
        loading={true} />
      Loading..
    </div>
  );

  renderCheckmark = () => (
    <div className='margin'>
      <FontAwesomeIcon
        name='check-circle'
        size='2x'
        className='greenText' />
    </div>
  );

  renderListItem = ({ id, text, complete }) => (
    <ListGroupItem
      className='d-flex justify-content-center align-items-center'
      key={id}
    >
      {todo.complete ? this.renderCheckmark() : null}
      <div className='d-flex flex-grow-1 font-lg'>
        {text}
      </div>
      <Button
        className='fixedHeight margin'
        color='primary'
        onClick={this.onClickComplete(todo)}
        disabled={complete}
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