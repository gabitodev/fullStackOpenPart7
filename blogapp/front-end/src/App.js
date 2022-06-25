import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { getUserFromLocalStorage } from './reducers/loggedUserReducer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Notification from './components/Notification';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Users from './components/Users';
import { initializeUsers } from './reducers/usersReducer';
import User from './components/User';
import Blog from './components/Blog';
import { Container } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.loggedUser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserFromLocalStorage());
  }, [dispatch]);

  return (
    <Container>
      {loggedUser === null ? (
        <Login />
      ) : (
        <>
          <Navigation />
          <Notification />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default App;
