import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';

import { Spinner } from '../components';
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

  onClickComplete = (id, complete) => () => {
    const { token, completeTodo } = this.props;
    if (!complete)
      completeTodo(id, token);
  }

  onClickDelete = (id, complete) => () => {
    const { token, deleteTodo } = this.props;
    if (complete || window.confirm('Delete incomplete Todo?'))
      deleteTodo(id, token);
  }

  renderCheckmark() {
    return (
      <div className='ml-2 mr-4'>
        <FontAwesomeIcon
          name='check-circle'
          size='2x'
          className='text-success' />
      </div>
    );
  }

  renderListItem = ({ id, text, complete }) => (
    <ListGroupItem
      className='d-flex justify-content-center align-items-center'
      key={id}
    >
      {complete ? this.renderCheckmark() : null}
      <div className='d-flex flex-grow-1'>
        <h5>{text}</h5>
      </div>
      <Button
        className='fixedHeight ml-2 mr-4'
        color='primary'
        onClick={this.onClickComplete(id, complete)}
        disabled={complete}
      >Complete</Button>
      <Button
        className='fixedHeight'
        color='danger'
        onClick={this.onClickDelete(id, complete)}
      >Delete</Button>
    </ListGroupItem>
  );

  render() {
    const { todos, loading, error } = this.props;
    return (
      <Fragment>
        <ListGroup>
          {todos.map(this.renderListItem)}
        </ListGroup>
        <span className='text-danger'>{error}</span>
        <Spinner loading={loading} />
      </Fragment>
    );
  }

}
