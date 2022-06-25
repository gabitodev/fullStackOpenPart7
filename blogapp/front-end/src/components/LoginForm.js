import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logginUser } from '../reducers/loggedUserReducer';
import { Button, TextField, Container } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userToLogin = {
      username,
      password
    };
    dispatch(logginUser(userToLogin));
    setUsername('');
    setPassword('');
  };

  return (
    <Container>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', width: '50%', margin: '0 auto' }} onSubmit={(event) => handleSubmit(event)}>
        <div>
          <TextField
            sx={{ width: '100%' }}
            id="username"
            label="Username"
            variant="outlined"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            sx={{ width: '100%' }}
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant='outlined' id="login-button" type="submit">
        login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
