import {
  FETCH_ALL_TODOS_PENDING, FETCH_ALL_TODOS_FULFILLED, FETCH_ALL_TODOS_REJECTED,
  ADD_NEW_TODO_FULFILLED, ADD_NEW_TODO_REJECTED,
  COMPLETE_TODO_FULFILLED, COMPLETE_TODO_REJECTED,
  DELETE_TODO_FULFILLED, DELETE_TODO_REJECTED
} from '../actions/types';

const initialState = {
  loading: false,
  todos: [],
  error: null
};

export default function(state=initialState, action) {
  switch(action.type) {
    case FETCH_ALL_TODOS_PENDING:
      return {
        ...state,
        loading: true,
        todos: [],
        error: null
      }

    case ADD_NEW_TODO_REJECTED:
    case COMPLETE_TODO_REJECTED:
    case DELETE_TODO_REJECTED:
      const response = action.payload.response || null;
      const data = response.data || null;
      const msg = (data && data.message) ? data.message : 'Unknown Error.';
      return {
        ...state,
        loading: false,
        error: msg
      }

    case FETCH_ALL_TODOS_REJECTED:
      const mutation = {
        loading: false,
        todos: []
      };

      const _response = action.payload.response || null;
      const _data = _response.data || null;
      mutation.error = (_data && _data.message) ? _data.message : 'Unknown Error.';
      if (mutation.error.includes('No todos found.'))
        mutation.error = null;

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
