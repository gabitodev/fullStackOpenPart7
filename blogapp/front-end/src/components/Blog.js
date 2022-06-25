import { useDispatch, useSelector } from 'react-redux';
import { removeBlog, updateBlog } from '../reducers/blogsReducer';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { Typography, Link, Button } from '@mui/material';

const Blog = () => {
  const blogs = useSelector(state => state.blogs);
  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);
  const loggedUser = useSelector(state => state.loggedUser);
  const dispatch = useDispatch();

  if (!blog) return null;

  const pStyle = {
    padding: 0,
    margin: 0,
    marginTop: '1rem',
  };

  const handleLike = (id) => {
    dispatch(updateBlog(id));
  };

  const handleRemove = (id) => {
    dispatch(removeBlog(id));
  };

  return (
    <div>
      <Typography variant='h4' sx={{ marginTop: '1rem' }}>{blog.title} {blog.author}</Typography>
      <Link component='button' href={blog.url} sx={pStyle}>{blog.url}</Link>
      <Typography sx={pStyle}>
            Likes {blog.likes}
        <span style={{ marginLeft: '1rem' }}>
          <Button
            variant='outlined'
            className="likeButton"
            onClick={() => handleLike(blog.id)}
          >
                Like
          </Button>
        </span>
      </Typography>
      <Typography sx={pStyle}>added by {blog.user.username}</Typography>
      {blog.user.username === loggedUser.username ? (
        <Button variant='outlined' sx={{ marginTop: '1rem' }} onClick={() => handleRemove(blog.id)}>Remove</Button>
      ) : (
        null
      )}
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
