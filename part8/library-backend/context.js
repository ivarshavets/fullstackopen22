const jwt = require('jsonwebtoken')
const User = require('./models/user')

const context = async ({ req, _res }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.auth.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7), process.env.JWT_SECRET
    )
    const currentUser = await User
      .findById(decodedToken.id)
    return { currentUser }
  }
}

module.exports = context
