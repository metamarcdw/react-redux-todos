import http from 'axios';
import {
  FETCH_ALL_TODOS, COMPLETE_TODO, DELETE_TODO, ADD_NEW_TODO,
  REGISTER_USER_REJECTED, LOGIN_USER, LOGOUT_USER,
  FORM_PANEL_UPDATE, LOGIN_FORM_UPDATE, CLEAR_LOGIN_FORM
} from './types';

const axios = http.create({baseURL: "https://metamarcdw.pythonanywhere.com"});

export const bearer = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const fetchAllTodos = token => {
  return {
    type: FETCH_ALL_TODOS,
    payload: axios.get("/todo", bearer(token))
  };
};

export const completeTodo = (id_, token) => {
  return {
    type: COMPLETE_TODO,
    payload: axios.put(`/todo/${id_}`, null, bearer(token))
  };
};

export const deleteTodo = (id_, token) => {
  return {
    type: DELETE_TODO,
    payload: axios.delete(`/todo/${id_}`, bearer(token))
  };
};

export const addNewTodo = (text, token) => {
  return {
    type: ADD_NEW_TODO,
    payload: axios.post("/todo", { text }, bearer(token))
  };
};

export const registerUser = (name, password) => dispatch => {
  const newUser = { name, password };
  axios.post("/user", newUser)
    .then(() => dispatch(loginUser(name, password)))
    .catch(err => dispatch({
      type: REGISTER_USER_REJECTED,
      payload: err
    }));
};

export const loginUser = (username, password) => {
  return {
    type: LOGIN_USER,
    payload: axios.get("/login", {
      auth: {
        username,
        password
      }
    })
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const formPanelUpdate = text => {
  return {
    type: FORM_PANEL_UPDATE,
    payload: { text }
  };
};

export const loginFormUpdate = (fieldName, fieldText) => {
  const action = {
    type: LOGIN_FORM_UPDATE,
    payload: {}
  };
  action.payload[fieldName] = fieldText;
  return action;
};

export const clearLoginForm = () => {
  return {
    type: CLEAR_LOGIN_FORM
  };
};
