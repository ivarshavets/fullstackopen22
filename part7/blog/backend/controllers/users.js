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

  // Mongoose does not have a built-in validator for checking the uniqueness of a field. mongoose-unique-validator npm package is a ready-made solution for this.
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
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// populate (join function in Mongoose) allows to add user obj
// (or specified fields in user obj) instead of user ids
userRouter.get('/', async (_request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users)
})

// router.get('/', async (request, response) => {
//   const users = await User
//     .find({})
//     .populate('blogs', { author: 1, title: 1, url: 1, likes: 1 })

//   response.json(users)
// })

// error handling using next func without express-async-errors lib
userRouter.get('/:id', async (request, response, next) => {
  const {
    params: { id }
  } = request
  try {
    const users = await User.findById(id).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1
    })
    if (users) {
      response.json(users)
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

module.exports = userRouter
