const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
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

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

// error handling using next func without express-async-errors lib
blogRouter.get('/:id', async (request, response, next) => {
  const { params: { id }, user } = request
  if (!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    const returnedBlog = await Blog.findById(id)
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

    if (blogToUpdate.user?.toString() !== user.id) {
      return response.status(401).json({
        error: 'only the creator can delete a blog'
      })
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { username: 1, name: 1 }) // handling the user reference on update since the quest data has only user id.

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
  const { params: { id }, user } = request
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
    user.blogs = user.blogs.filter(blogId => blogId.toString() !== result._id.toString())

    await user.save()
  } catch (e) {
    next(e)
  }
})

module.exports = blogRouter
