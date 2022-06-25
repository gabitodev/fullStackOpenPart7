import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Togglable from './Togglable';
import { createBlog } from '../reducers/blogsReducer';
import { Button, TextField } from '@mui/material';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blogToCreate = {
      title,
      author,
      url
    };
    dispatch(createBlog(blogToCreate));
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem', width: '50%' }} onSubmit={addBlog} className="blogForm">
        <div>
          <TextField
            style={{ width: '100%' }}
            id="title-input"
            label="Title"
            variant="outlined"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Blog title"
          />
        </div>
        <div>
          <TextField
            style={{ width: '100%' }}
            id="author-input"
            label="Author"
            variant="outlined"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Blog author"
          />
        </div>
        <div>
          <TextField
            style={{ width: '100%' }}
            id="url-input"
            label="Url"
            variant="outlined"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Blog url"
          />
        </div>
        <Button id="create-button" type="submit">
        Create Blog
        </Button>
      </form>
    </Togglable>

  );
};

export default BlogForm;
