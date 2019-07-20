import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

// import modules
import * as tod0 from './todo';
import * as user from './user';


// TODO Functions
export const todo = tod0.crud_todo;

// USER Functions
export const onUserCreate = user.onUserCreate;
export const onUserDelete = user.onUserDelete;