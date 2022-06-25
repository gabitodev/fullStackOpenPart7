import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import { Link } from 'react-router-dom';
const BlogsList = () => {
  const blogs = useSelector(state => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.votes - a.votes);

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  return (
    <>
      {sortedBlogs.map(blog => {
        return (
          <div key={blog.id}>
            <Button sx={{ width: '100%', marginTop: '1rem', justifyContent: 'left' }} variant='outlined' LinkComponent={Link} to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Button>
          </div>
        );
      })}
    </>
  );
};

export default BlogsList;