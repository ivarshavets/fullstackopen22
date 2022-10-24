const router = require('express').Router()

const Blog = require('../models/blog')

router.get('/', (_request, response) => {
  Blog
    .find({})
    .then(blogs => response.json(blogs))
})

router.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.log(error.message))
})

module.exports = router
