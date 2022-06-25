import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const likedBlog = action.payload;
      return state.map(blog => blog.id !== likedBlog.id ? blog : likedBlog);
    },
    deleteBlog(state, action) {
      const blogRemoved = action.payload;
      return state.filter(blog => blog.id !== blogRemoved.id);
    },
    addComment(state, action) {
      const blogCommented = action.payload;
      return state.map(blog => blog.id !== blogCommented.id ? blog : blogCommented);
    }
  }
});

export const { setBlogs, appendBlog, like, deleteBlog, addComment } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogToCreate) => {
  return async dispatch => {
    try {
      const blogCreated = await blogService.create(blogToCreate);
      dispatch(appendBlog(blogCreated));
      dispatch(setNotification({
        message: `Blog ${blogCreated.title} by ${blogCreated.author} created`,
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

export const updateBlog = (id) => {
  return async dispatch => {
    try {
      const blogUpdated = await blogService.update(id);
      dispatch(addComment(blogUpdated));
      dispatch(setNotification({
        message: `Blog ${blogUpdated.title} liked`,
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

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const blogs = getState().blogs;
      const blogRemoved = blogs.find(blog => blog.id === id);
      await blogService.remove(id);
      dispatch(deleteBlog(blogRemoved));
      dispatch(setNotification({
        message: `Blog ${blogRemoved.title} removed`,
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

export const addCommentToBlog = (id, comment) => {
  return async (dispatch, getState) => {
    try {
      const newComment = await blogService.addComment(id, comment);
      const blogs = getState().blogs;
      const blogCommented = blogs.find(blog => blog.id === newComment.blog);
      const addedCommentToBlog = { ...blogCommented, comments: blogCommented.comments.concat(newComment) };
      dispatch(addComment(addedCommentToBlog));
      dispatch(setNotification({
        message: `Added comment to ${blogCommented.title} by ${blogCommented.author}`,
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

export default blogsSlice.reducer;