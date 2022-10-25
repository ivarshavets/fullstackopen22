const _groupBy = require('lodash/groupBy')

const dummy = (_blogs) => 1

const totalLikes = (blogsList) => {
  return blogsList.length === 0
    ? 0
    : blogsList.reduce((sum, { likes }) => sum + likes, 0)
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

  const blogsCounts = Object.keys(blogsByAuthor).map(author => ({
    author,
    blogsCount: blogsByAuthor[author].length
  }))

  return blogsCounts.sort((a, b) => b.blogsCount - a.blogsCount)[0]
}

const mostLikes = (blogList) => {
  const blogsByAuthor = _groupBy(blogList, (blog) => blog.author)

  const likesCounts = Object.keys(blogsByAuthor).map(author => ({
    author,
    likesCount: blogsByAuthor[author].reduce((total, { likes }) => total + likes, 0)
  }))

  return likesCounts.sort((a, b) => b.likesCount - a.likesCount)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
}
