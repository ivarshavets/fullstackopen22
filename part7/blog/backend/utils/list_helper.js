const _groupBy = require('lodash/groupBy')

// disabling linter because this func is a part of the assignment
const dummy = (_blogs) => 1 // eslint-disable-line no-unused-vars

const totalLikes = (blogsList) => {
  return blogsList.length === 0 ? 0 : blogsList.reduce((sum, { likes }) => sum + likes, 0)
}

const favoriteBlogs = (blogsList) => {
  if (blogsList.length === 0) {
    return undefined
  }

  let favBlog
  let favBlogLikes = 0

  blogsList.forEach((el) => {
    if (el.likes > favBlogLikes) {
      favBlogLikes = el.likes
      favBlog = el
    }
  })

  return favBlog

  // // shorter version:
  // return blogsList.sort((a, b) => b.likes - a.likes )[0]
}

const mostBlogs = (blogList) => {
  const blogsByAuthor = _groupBy(blogList, (blog) => blog.author)

  const blogsCounts = Object.keys(blogsByAuthor).map((author) => ({
    author,
    blogsCount: blogsByAuthor[author].length
  }))

  return blogsCounts.sort((a, b) => b.blogsCount - a.blogsCount)[0]
}

const mostLikes = (blogList) => {
  const blogsByAuthor = _groupBy(blogList, (blog) => blog.author)

  const likesCounts = Object.keys(blogsByAuthor).map((author) => ({
    author,
    likesCount: blogsByAuthor[author].reduce((total, { likes }) => total + likes, 0)
  }))

  return likesCounts.sort((a, b) => b.likesCount - a.likesCount)[0]
}

const mostBlogs2 = (blogList) => {
  if (blogList.length === 0) {
    return undefined
  }

  // dictionary of (author, blogs) pairs
  let dictionary = {}
  blogList.forEach((blog) => {
    if (dictionary[blog.author]) {
      dictionary[blog.author].push(blog)
    } else {
      dictionary[blog.author] = [blog]
    }
  })

  let mostBlogs = { author: '', blogsCount: 0 }
  for (const author in dictionary) {
    const blogsNum = dictionary[author].length
    if (blogsNum > mostBlogs.blogsCount) {
      mostBlogs.blogsCount = blogsNum
      mostBlogs.author = author
    }
  }
  return mostBlogs
}

const mostBlogs3 = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  // dictionary of (author, blogs count) pairs
  let dictionary = {}

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    author in dictionary ? (dictionary[author] += 1) : (dictionary[author] = 1)
  }

  const mostBlogs = { author: '', blogs: 0 }
  for (const [key, value] of Object.entries(dictionary)) {
    if (value > mostBlogs.blogs) {
      mostBlogs.blogs = value
      mostBlogs.author = key
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
  mostBlogs2,
  mostBlogs3
}
