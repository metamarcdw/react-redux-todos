import { combineReducers } from 'redux';

import formPanelReducer from './formPanelReducer';
import loginFormReducer from './loginFormReducer';
import loginUserReducer from './loginUserReducer';
import todoListReducer from './todoListReducer';

export const rootReducer = combineReducers({
    todoList: todoListReducer,
    loginUser: loginUserReducer,
    loginForm: loginFormReducer,
    formPanel: formPanelReducer
});
