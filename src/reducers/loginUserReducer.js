import {
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REJECTED,
  REGISTER_USER_REJECTED,
  LOGOUT_USER
} from '../actions/types';

const initialState = {
  loading: false,
  loggedIn: false,
  token: null,
  error: null
};

export default function(state=initialState, action) {
  switch(action.type) {
    case LOGIN_USER_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case LOGIN_USER_FULFILLED:
      return {
        loading: false,
        loggedIn: true,
        token: action.payload.data.token
      }

    case REGISTER_USER_REJECTED:
    case LOGIN_USER_REJECTED:
      const { data } = action.payload.response || null;
      const msg = (data && data.message) ? data.message : 'Unknown Error.';
      return {
        ...state,
        loading: false,
        error: msg
      }

    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        token: null
      }

    default:
      return state
  }
};
