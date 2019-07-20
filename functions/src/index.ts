import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// import modules
import * as todo from './todo';
import * as user from './user';


// TODO Functions // Trigger
/*export const onCreateTodo = todo.onCreateTodo;
export const onDeleteTodo = todo.onDeleteTodo;
export const onUpdateTodo = todo.onUpdateTodo;*/
export const tod0 = todo.crud_todo;

// USER Functions // Trigger
export const onUserCreate = user.onUserCreate;
export const onUserDelete = user.onUserDelete;