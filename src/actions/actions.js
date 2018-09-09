import http from 'axios';
import {
  FETCH_ALL_TODOS, COMPLETE_TODO, DELETE_TODO, ADD_NEW_TODO,
  REGISTER_USER_REJECTED, LOGIN_USER, LOGOUT_USER,
  FORM_PANEL_UPDATE, LOGIN_FORM_UPDATE, CLEAR_LOGIN_FORM
} from './types';

const axios = http.create({
  baseURL: "https://metamarcdw.pythonanywhere.com"
});

export const bearer = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const fetchAllTodos = token => ({
  type: FETCH_ALL_TODOS,
  payload: axios.get("/todo", bearer(token))
});

export const completeTodo = (id, token) => ({
  type: COMPLETE_TODO,
  payload: axios.put(`/todo/${id}`, null, bearer(token))
});

export const deleteTodo = (id, token) => ({
  type: DELETE_TODO,
  payload: axios.delete(`/todo/${id}`, bearer(token))
});

export const addNewTodo = (text, token) => ({
  type: ADD_NEW_TODO,
  payload: axios.post("/todo", { text }, bearer(token))
});

export const registerUser = (name, password) => dispatch => {
  const newUser = { name, password };
  axios.post("/user", newUser)
    .then(() => dispatch(loginUser(name, password)))
    .catch(err => dispatch({
      type: REGISTER_USER_REJECTED,
      payload: err
    }));
};

export const loginUser = (username, password) => ({
  type: LOGIN_USER,
  payload: axios.get("/login", {
    auth: {
      username,
      password
    }
  })
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const formPanelUpdate = text => ({
  type: FORM_PANEL_UPDATE,
  payload: { text }
});

export const loginFormUpdate = (fieldName, fieldText) => ({
  type: LOGIN_FORM_UPDATE,
  payload: {
    [fieldName]: fieldText
  }
});

export const clearLoginForm = () => ({
  type: CLEAR_LOGIN_FORM
});
