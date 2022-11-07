const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'password is required and must be at least 3 chars long'
    })
  }

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  // encrypting the password
  const saltRound = 10
  const passwordHash = await bcrypt.hash(password, saltRound)

  const user = new User({
    username,
    name,
    password: passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.json(users)
})

// router.get('/', async (request, response) => {
//   const users = await User
//     .find({})
//     .populate('blogs', { author: 1, title: 1, url: 1, likes: 1 })

//   response.json(users)
// })

module.exports = userRouter
