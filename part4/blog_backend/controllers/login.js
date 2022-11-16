const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  // passwords themselves are not saved to the database, but hashes calculated from the passwords
  //the bcrypt.compare method is used to check if the password is correct
  const isPwdCorrect = user && await bcrypt.compare(password, user.passwordHash)

  if (!isPwdCorrect) {
    response.status(401)
      .json({
        error: 'invalid username or password'
      })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // The token is digitally signed using a secret key from the env variable SECRET
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 } // token expires in 60*60 seconds = one hour
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
