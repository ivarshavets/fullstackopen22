const {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
} = require('../utils/list_helper')

test('dummy', () => {
  const blog = [1, 2]

  expect(dummy(blog)).toBe(1)
})

const blogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 6,
    __v: 0
  },
]

const listWithOneBlog = blogs.slice(0, 1)

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that blog', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when a list has few blogs, equals the sum of the likes of all blogs', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(18)
  })


  test('when the list is empty, the likes equals 0', () => {
    expect(totalLikes([])).toBe(0)
  })
})

describe ('favorite blog', () => {
  test('when list has only one blog, it is the favorite one', () => {
    expect(favoriteBlogs(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('when a list has few blogs, the favorite one is one with the most likes', () => {
    expect(favoriteBlogs(blogs)).toEqual(blogs[1])
  })

  test('when list is empty, it is undefined', () => {
    expect(favoriteBlogs([])).toBe(undefined)
  })
})

describe('most blogs', () => {
  test('when list has only one blog, return the its author', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', blogsCount: 1 })
  })

  test('when list has few blogs, return the author with most blogs', () => {
    expect(mostBlogs(blogs)).toEqual({ author: 'Edsger W. Dijkstra', blogsCount: 2 })
  })

  test('when list is empty, return undefined', () => {
    expect(mostBlogs([])).toBeUndefined()
  })
})

describe('most likes', () => {
  test('when list has only one blog, return its author', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', likesCount: 5 })
  })

  test('when list has few blogs, return the author with most likes', () => {
    expect(mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likesCount: 11 })
  })

  test('when list is empty, return undefined', () => {
    expect(mostLikes([])).toBeUndefined()
  })
})
