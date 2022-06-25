import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem } from '@mui/material';

const User = () => {
  const users = useSelector(state => state.users);
  const id = useParams().id;
  const user = users.find(user => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <>
      <Typography sx={{ marginTop: '1rem' }} variant='h5'>{user.name}</Typography>
      <Typography sx={{ marginTop: '1rem' }} variant='h6'>Added blogs</Typography>
      <List>
        {user.blogs.map(blog => <ListItem key={blog.id}>{blog.title}</ListItem> )}
      </List>
    </>
  );
};

export default User;