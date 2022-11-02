const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const normilizedBlog = request.body.likes ? request.body : {...request.body, likes: 0}
  const blog = new Blog(normilizedBlog)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// // error handling using next func without express-async-errors lib
// router.post('/', async (request, response, next) => {
//   const blog = new Blog(request.body)
//   try {
//     const result = await blog.save()
//     response.status(201).json(result)
//   } catch (error) {
//     next(error.message)
//   }
// })

module.exports = router
