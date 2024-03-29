const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogRouter.get('/', async (_request, response) => {
  // The populate method is chained after the find method making the initial query. The parameter given to the populate method defines that the ids referencing user objects in the user field of the blog document will be replaced by the referenced user documents.
  // We can use the populate parameter for choosing the fields we want to include from the documents
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { body, user } = request

  if (!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0,
    user: user.id
  })

  let savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  savedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

// error handling using next func without express-async-errors lib
blogRouter.get('/:id', async (request, response, next) => {
  const {
    params: { id },
    user
  } = request
  if (!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    const returnedBlog = await Blog.findById(id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { comment: 1 })
    if (returnedBlog) {
      response.json(returnedBlog)
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

blogRouter.patch('/:id', async (request, response, next) => {
  const { id } = request.params
  const { body, user } = request
  if (!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    const blogToUpdate = await Blog.findById(id)

    if (!blogToUpdate) {
      return response.status(404).end()
    }

    if (blogToUpdate.user?.toString() !== user.id && !body.likes) {
      return response.status(401).json({
        error: 'only the creator can update a blog'
      })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true, context: 'query' }
    )
      .populate('user', { username: 1, name: 1 }) // handling the user reference on update since the request data has only user id.
      .populate('comments', { comment: 1 })
    if (updatedBlog === null) {
      response.status(404).end()
    } else {
      response.json(updatedBlog)
    }
  } catch (e) {
    next(e)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  const {
    params: { id },
    user
  } = request
  if (!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    const blogToDelete = await Blog.findById(id)

    if (!blogToDelete) {
      return response.status(404).end()
    }

    // id is a Mongoose Object and needs to be convert to string
    if (blogToDelete.user?.toString() !== user.id) {
      return response.status(401).json({
        error: 'only the creator can delete a blog'
      })
    }

    const result = await Blog.findByIdAndRemove(id)

    if (result === null) {
      response.status(404).end()
    } else {
      response.status(204).end()
    }

    // blog id is a Mongoose Object not a String and needs to be convert to string
    user.blogs = user.blogs.filter((blogId) => blogId.toString() !== result._id.toString())

    await user.save()
  } catch (e) {
    next(e)
  }
})

blogRouter.post('/:id/comments', async (request, response, next) => {
  const {
    params: { id },
    body: { comment }
  } = request

  try {
    let blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).end()
    }

    const newComment = new Comment({
      comment,
      blog: blog._id
    })

    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    blog = await Blog.findById(id).populate('user', { username: 1, name: 1 }).populate('comments')

    response.status(201).json(savedComment)
  } catch (e) {
    next(e)
  }
})

blogRouter.get('/:id/comments', async (request, response, next) => {
  const {
    params: { id }
  } = request

  try {
    const blog = await Blog.findById(id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments')

    if (!blog) {
      return response.status(404).end()
    }

    response.json(blog.comments)
  } catch (e) {
    next(e)
  }
})

module.exports = blogRouter
