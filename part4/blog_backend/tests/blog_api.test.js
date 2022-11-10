const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const {
  initialBlogs,
  blogsInDb,
  nonExistingId
} = require('./blog_test_helper')

const api = supertest(app)

let token

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('rootPassword', 10)

  const user = new User({
    username: 'root',
    name: 'Michael Chan',
    passwordHash
  })

  await user.save()

  const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'rootPassword' })

  token = response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(initialBlogs)

  // // Adding items in specific execution order
  // for (blog of initialBlogs) {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  // }

  // // forEach can not be used: every iteration of the forEach loop generates its own asynchronous operation, and beforeEach won't wait for them to finish executing. In other words, the await commands defined inside of the forEach loop are not in the beforeEach function, but in separate functions that beforeEach will not wait for.

  // // Adding items with Promise.all in parallel. Can not be executed in a particular order
  // const blogsList = initialBlogs
  //   .map(blog => new blog(blog))
  // // array of promises for saving each of the items to the database.
  // const promiseArray = blogsList.map(blog => blog.save())
  // await Promise.all(promiseArray)
})

describe('GET request', () => {
  test('blogposts are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
   })

   test('a specific blog is within the returned notes and identified by field id', async () => {
    const response = await api.get('/api/blogs')

    const titlesList = response.body.map(r => r.title)
    expect(titlesList).toContain(initialBlogs[0].title)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
   })
})

describe('GET single post', () => {
  test('succeeds with status code 200 and content is shown', async () => {
    const initialBlogsInDb = (await blogsInDb())[0]
    const resultBlog = await api.get(`/api/blogs/${initialBlogsInDb.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(initialBlogsInDb)
  })

  test('fails with status code 404 in case of non-existing id', async () => {
    const id = await nonExistingId()
    await api.get(`/api/blogs/${id}`)
      .expect(404)
  })

  test('fails with status code 400 in case of invalid id', async () => {
    const id = '1'
    const response = await api.get(`/api/blogs/${id}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect(({body: {error}}) => error === 'id format is incorrect')
  })
})

describe('POST request', () => {
  test('succeeds with status code 201 in case of a valid blog', async () => {
    const newBlog = {
      title: "A new Blogpost",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const resultBlogs = await blogsInDb()
    expect(resultBlogs).toHaveLength(initialBlogs.length + 1)

    const titles = resultBlogs.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('likes default value is 0 if property is missing', async () => {
    const newBlog = {
      title: "A new Blogpost",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const resultBlogs = await blogsInDb()
    const addedBlog = resultBlogs[resultBlogs.length - 1]
    expect(addedBlog.likes).toBe(0)
  })

  test('fails if a blog is added without required fields', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const resultBlogs = await blogsInDb()
    expect(resultBlogs).toHaveLength(initialBlogs.length)
  })

  test('fails with status code 401 if bad user credentials', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('DELETE request', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const initialBlogsInDb = await blogsInDb()
    const {id} = initialBlogsInDb[0]

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const resultBlogsInDb = await blogsInDb()
    expect(resultBlogsInDb).toHaveLength(initialBlogs.length - 1)
    expect(resultBlogsInDb).not.toContain(id)

    const titles = resultBlogsInDb.map(r => r.title)
    expect(titles).not.toContain(initialBlogsInDb[0].title)
  })

  test('fails with status code 404 in case of non-existing id', async () => {
    const id = await nonExistingId()

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)

    const resultBlogsInDb = await blogsInDb()
    expect(resultBlogsInDb).toHaveLength(initialBlogs.length)
  })

  test('fails with 400 error in case of invalid id', async () => {
    const invalidId = '1'
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const resultBlogsInDb = await blogsInDb()
    expect(resultBlogsInDb).toHaveLength(initialBlogs.length)
})
})

describe('PUT request', () => {
  test('likes property is updated', async () => {
    const {id} = (await blogsInDb())[0]
    const newProp = {likes: 5}

    await api
      .put(`/api/blogs/${id}`)
      .send(newProp)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(res => {
        res.body.likes = newProp.likes
      })

    const resultBlog = (await blogsInDb()).find(b => b.id === id)
    expect(resultBlog.likes).toBe(newProp.likes)
  })

  test('fails with status code 400 in case of invalid id', async () => {
    const invalidId = '1'

    await api
      .put(`/api/blogs/${invalidId}`)
      .send({likes: 5})
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('fails with 404 error in case non-existing id', async () => {
    const id = await nonExistingId()

    await api.put(`/api/blogs/${id}`)
      .send({likes: 5})
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
