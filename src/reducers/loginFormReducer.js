import {
  LOGIN_FORM_UPDATE,
  CLEAR_LOGIN_FORM
} from '../actions/types';

const initialState = {
  usernameText: "",
  passwordText: ""
};

export default function(state=initialState, action) {
  switch(action.type) {
    case LOGIN_FORM_UPDATE:
      return {...state, ...action.payload};
    case CLEAR_LOGIN_FORM:
      return initialState;
    default:
      return state;
  }
};
