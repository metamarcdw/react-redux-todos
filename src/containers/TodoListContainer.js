import { connect } from 'react-redux';
import {
  fetchAllTodos,
  completeTodo,
  deleteTodo
} from '../actions/actions';
import { TodoList } from '../components';

const mapStateToProps = state => {
  return {
    todoList: state.todoList,
    loginUser: state.loginUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllTodos: t => dispatch(fetchAllTodos(t)),
    completeTodo: (i, t) => dispatch(completeTodo(i, t)),
    deleteTodo: (i, t) => dispatch(deleteTodo(i, t))
  }
};

export const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
