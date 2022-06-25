import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToBlog } from '../reducers/blogsReducer';
import { Typography, TextField, Button } from '@mui/material';

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleComment = async (event, id) => {
    event.preventDefault();
    const newComment = { comment };
    dispatch(addCommentToBlog(id, newComment));
    setComment('');
  };

  return(
    <>
      <Typography sx={{ marginTop: '1rem' }} variant='h6'>Comments</Typography>
      <form style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} onSubmit={(event) => handleComment(event, blog.id)}>
        <TextField type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        <Button sx={{ height: '100%' }} variant='outlined' type='submit'>add comment</Button>
      </form>
      {blog.comments.map(comment => <Typography sx={{ marginTop: '1rem' }} key={comment.id}>{comment.message}</Typography> )}
    </>
  );
};

export default Comments;