const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// get JWT, sent in the Authorization header using the Bearer schema
const getToken = request => {
  console.log('request', request)
  const authorization = request.get('authorization')
  console.log('authorization', authorization)
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (_request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const {body} = request

  const token = getToken(request)

  // checking of the validity of the token
  // decoding the token and returning the Object which the token was based on
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const {id: userId} = decodedToken
  if (!userId) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(userId)
  console.log('user', user)

  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

// // error handling using next func without express-async-errors lib
// blogRouter.post('/', async (request, response, next) => {
//   const blog = new Blog(request.body)
//   try {
//     const result = await blog.save()
//     response.status(201).json(result)
//   } catch (error) {
//     next(error)
//   }
// })

blogRouter.get('/:id', async (request, response, next) => {
  const {id} = request.params
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

blogRouter.put('/:id', async (request, response, next) => {
  const {id} = request.params
  const {body} = request
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {...body},
      { new: true, runValidators: true, context: 'query' }
    )

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
  const {id} = request.params
  try {
    const returnedData = await Blog.findByIdAndRemove(id)
    if (returnedData === null) {
      response.status(404).end()
    } else {
      response.status(204).end()
    }
  } catch (e) {
    next(e)
  }
})

module.exports = blogRouter
