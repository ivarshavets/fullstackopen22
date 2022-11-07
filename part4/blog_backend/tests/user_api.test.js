const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const {initialUsers, usersInDb} = require('./user_test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
  const user = new User(initialUsers[0])
  await user.save()
})

describe('GET request', () => {
  test('users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(initialUsers.length)
  })

  test('a specific user is within the returned users and it is identified by field id', async () => {
    const response = await api.get('/api/users')

    const usernameList = response.body.map(r => r.username)
    expect(usernameList).toContain(initialUsers[0].username)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
   })

   test('user password is not displayed', async () => {
    const response = await api.get('/api/users')
    for (const user of response.body) {
      expect(user.passwordHash).toBeUndefined
    }
  })
})

describe('POST request', () => {
  test('succeeds with status code 201', async () => {
    const newUser = {
      'username': 'newUser',
      'name': 'newUserName',
      'password': 'newUserPassword'
    }

    await api.post('/api/users').send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const resultedUsers = await usersInDb()
    expect(resultedUsers).toHaveLength(initialUsers.length + 1)
  })

  test('failes with status code 400 if user is without passwortd', async () => {
    const newUser = {
      'username': 'userWithoutPassword'
    }

    await api.post('/api/users').send(newUser)
      .expect(400)

    const resultedUsers = await usersInDb()
    expect(resultedUsers).toHaveLength(initialUsers.length)
  })

  test('failes with status code 400 if user exists', async () => {
    const newUser = initialUsers[0]

      await api.post('/api/users').send(newUser)
        .expect(400)

      const resultedUsers = await usersInDb()
      expect(resultedUsers).toHaveLength(initialUsers.length)
  })

  test('failes with status code 400 if username less than 3 chars', async () => {
    const newUser = {
      'username': 'a',
      'name': 'test name',
      'password': 'userPassword'
    }

    await api.post('/api/users').send(newUser)
      .expect(400)

    const resultedUsers = await usersInDb()
    expect(resultedUsers).toHaveLength(initialUsers.length)
  })

  test('failes with 400 if password is less than 3 chars', async () => {
    const newUser = {
      'username': 'userName',
      'name': 'user name',
      'password': "p"
    }

    await api.post('/api/users').send(newUser)
      .expect(400)

    const resultedUsers = await usersInDb()
    expect(resultedUsers).toHaveLength(initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
