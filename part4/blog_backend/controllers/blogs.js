const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const {body} = request

  // const user = await User.findById(body.userId)
  const user = await User.findOne()

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
// router.post('/', async (request, response, next) => {
//   const blog = new Blog(request.body)
//   try {
//     const result = await blog.save()
//     response.status(201).json(result)
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/:id', async (request, response, next) => {
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

router.put('/:id', async (request, response, next) => {
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


router.delete('/:id', async (request, response, next) => {
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

module.exports = router
