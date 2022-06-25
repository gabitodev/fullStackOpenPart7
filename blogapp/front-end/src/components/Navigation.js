import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loggedUserReducer';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
const Navigation = () => {
  const loggedUser = useSelector(state => state.loggedUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return(
    <AppBar position='static'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>BlogApp</Typography>
        <Button color='inherit' LinkComponent={Link} to='/'>Blogs</Button>
        <Button color='inherit' LinkComponent={Link} to='/users'>Users</Button>
        <Typography variant='h6'>
          {loggedUser.name} logged-in{' '}
          <span>
            <Button variant='outlined' color='inherit' onClick={handleLogout}>logout</Button>
          </span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;