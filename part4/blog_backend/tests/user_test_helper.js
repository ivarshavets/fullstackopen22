// const bcrypt = require('bcrypt')
const User = require('../models/user')

const getPasswordHash = async () => {
  const pwd = await bcrypt.hash('mchanpwd', 10)
  console.log(pwd)
  return pwd
}

// const passwordHash = await bcrypt.hash('mchanpwd', 10)
const initialUsers = [
  {
    username: 'root',
    name: 'Michael Chan',
    passwordHash: 'mchanpassword'
  }
]

const nonExistingId = async () => {
  const user = new User({
    username: 'edijkstra',
    name: 'Edsger W. Dijkstra',
    passwordHash: 'DijkstraPwd'
  })

  await user.save()
  await user.remove()
  return user._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers, nonExistingId, usersInDb
}
