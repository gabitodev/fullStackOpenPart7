import LoginForm from './LoginForm';
import Togglable from './Togglable';
import { Typography } from '@mui/material';

const Login = () => {
  return (
    <>
      <Typography variant='h5'>Login</Typography>
      <Togglable buttonLabel="Login">
        <LoginForm />
      </Togglable>
    </>
  );
};

export default Login;