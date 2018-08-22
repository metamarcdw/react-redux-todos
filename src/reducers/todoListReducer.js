import {
  FETCH_ALL_TODOS_PENDING, FETCH_ALL_TODOS_FULFILLED, FETCH_ALL_TODOS_REJECTED,
  ADD_NEW_TODO_PENDING, ADD_NEW_TODO_FULFILLED, ADD_NEW_TODO_REJECTED,
  COMPLETE_TODO_PENDING, COMPLETE_TODO_FULFILLED, COMPLETE_TODO_REJECTED,
  DELETE_TODO_PENDING, DELETE_TODO_FULFILLED, DELETE_TODO_REJECTED
} from '../actions/types';

const initialState = {
  loading: false,
  todos: [],
  error: null
};

export default function(state=initialState, action) {
  let msg;
  switch(action.type) {
    case FETCH_ALL_TODOS_PENDING:
    case ADD_NEW_TODO_PENDING:
    case COMPLETE_TODO_PENDING:
    case DELETE_TODO_PENDING:
      return {
        ...state,
        loading: true
      }

    case ADD_NEW_TODO_REJECTED:
    case COMPLETE_TODO_REJECTED:
    case DELETE_TODO_REJECTED:
      msg = action.payload.response.data.message;
      if (!msg)
        msg = 'Unknown Error.';
      return {
        ...state,
        loading: false,
        error: msg
      }

    case FETCH_ALL_TODOS_REJECTED:
      let mutation = {
        loading: false,
        todos: []
      };
      msg = action.payload.response.data.message;

      if (!msg)
        msg = 'Unknown Error.';

      if (msg.includes('No todos found.'))
        mutation.error = msg;
      return {...state, ...mutation}

    case FETCH_ALL_TODOS_FULFILLED:
      return {
        ...state,
        loading: false,
        todos: action.payload.data.todos
      }

    case ADD_NEW_TODO_FULFILLED:
      const { new_todo } = action.payload.data;
      return {
        ...state,
        loading: false,
        todos: state.todos.concat(new_todo),
        error: null
      }

    case COMPLETE_TODO_FULFILLED:
      const { completed_todo } = action.payload.data;
      return {
        ...state,
        loading: false,
        todos: state.todos.map(todo => {
          if (todo.id === completed_todo.id)
            todo.complete = true;
          return todo;
        })
      }

    case DELETE_TODO_FULFILLED:
      const { deleted_todo } = action.payload.data;
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(todo => todo.id !== deleted_todo.id)
      }

    default:
      return state
  }

};
