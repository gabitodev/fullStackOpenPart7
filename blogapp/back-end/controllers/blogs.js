const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) =>  {
  const blogs = await Blog.find({})
    .populate('user', {username: 1, name: 1})
    .populate('comments', {message: 1, id: 1});
  response.status(200).json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { author, title, likes, url } = request.body;
  if (!(author && title)) {
    return response.status(400).json({error: 'missing title or author'});
  }

  const user = request.user;
  const blog = new Blog({
    title,
    author,
    likes,
    url,
    user: user._id
  });
  const savedBlog = await blog.save();
  await savedBlog.populate('user', {username: 1, name: 1});
  await savedBlog.populate('comments', {comment: 1});

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();
  
  response.status(201).json(savedBlog);
  
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) return response.status(401).json({error: 'invalid user'});
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'wrong user' });
  }
});

blogsRouter.patch('/:id', userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) return response.status(401).json({error: 'invalid user'});
  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, {$inc: {likes: 1}}, { new: true }).populate('user', {username: 1, name: 1});
  response.status(200).json(blogUpdated);
});

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  const user = request.user;
  const { comment } = request.body;
  if (!user) return response.status(401).json({error: 'invalid user'});

  const blog = await Blog.findById(request.params.id);
  console.log(blog);

  const newComment = new Comment({
    message: comment,
    blog: blog._id,
    user: user._id
  });

  console.log(newComment);

  const savedComment = await newComment.save();
  blog.comments = blog.comments.concat(savedComment);
  await blog.save();

  response.status(201).json(savedComment);
})

module.exports = blogsRouter;