import blogsReducer from './reducers/blogsReducer';
import { configureStore } from '@reduxjs/toolkit';
import loggedUserReducer from './reducers/loggedUserReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    loggedUser: loggedUserReducer,
    notification: notificationReducer,
    users: usersReducer,
  }
});

export default store;