import { connect } from 'react-redux';
import {
  fetchAllTodos,
  completeTodo,
  deleteTodo
} from '../actions';
import { TodoList } from '../components';

const mapStateToProps = state => {
  const { token } = state.loginUser;
  const { todos, loading, error } = state.todoList;
  return { token, todos, loading, error }
};

const mapDispatchToProps = dispatch => ({
  fetchAllTodos: t => dispatch(fetchAllTodos(t)),
  completeTodo: (i, t) => dispatch(completeTodo(i, t)),
  deleteTodo: (i, t) => dispatch(deleteTodo(i, t))
});

export const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
