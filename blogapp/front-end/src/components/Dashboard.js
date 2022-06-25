import BlogForm from './BlogForm';
import BlogsList from './BlogsList';
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <>
      <Typography variant='h4' sx={{ margin: '1rem 0' }}>Blogs</Typography>
      <BlogForm />
      <BlogsList />
    </>
  );
};

export default Dashboard;