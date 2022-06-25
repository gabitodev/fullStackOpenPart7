import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { setNotification } from './notificationReducer';

const loggedUserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  }
});

export const { setUser } = loggedUserSlice.actions;

export const getUserFromLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const logginUser = (userToLogin) => {
  return async dispatch => {
    try {
      const user = await loginService.login(userToLogin);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
      dispatch(setNotification({
        message: `${user.username} logged in`,
        isError: false,
      }, 5));
    } catch (error) {
      dispatch(setNotification({
        message: error.response.data.error,
        isError: true,
      }, 5));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setUser(null));
  };
};

export default loggedUserSlice.reducer;