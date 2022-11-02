const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const {
  initialBlogs,
  blogsInDb,
  nonExistingId
} = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany()

  // Adding items in specific execution order
  for (blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

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

describe('POST request', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "A new Blogpost",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
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
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const resultBlogs = await blogsInDb()
    const addedBlog = resultBlogs[resultBlogs.length - 1]
    expect(addedBlog.likes).toBe(0)
  })

  test('a blog without required fields is not added', async () => {
    const newBlog = {}

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const resultBlogs = await blogsInDb()
    expect(resultBlogs).toHaveLength(initialBlogs.length)
  })
})





// test('a specific blog can be viewed', async () => {})

// test('a blog can be deleted', async () => {})

afterAll(() => {
  mongoose.connection.close()
})
