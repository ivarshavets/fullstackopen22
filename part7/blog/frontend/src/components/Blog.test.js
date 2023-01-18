import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  let container

  const blog = {
    id: '1',
    title: 'Test blog',
    author: 'Ira',
    url: 'http://www.blog.com',
    likes: 3
  }

  const updateBlog = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={() => {}} />).container
  })

  test('renders title and author, but does not render its url and likes by default', () => {
    const title = screen.getByText(blog.title, { exact: false })
    expect(title).toBeDefined()
    // if no element is found, there is an exception and test fails before expect

    // aleternative visibility check with querySelector
    const author = container.querySelector('.blog_author')
    expect(author).toBeDefined()

    // // aleternative visibility check with findByText (exact match) which returns a promise
    // const title = await screen.findByText(blog.title)

    const details = container.querySelector('.blog_details')
    expect(details).toBeNull()

    // queryByText returns the element but it does not cause an exception
    const url = screen.queryByText(blog.url)
    expect(url).toBeNull()

    const likes = screen.queryByText(`Likes: ${blog.likes}`)
    expect(likes).toBeNull()
  })

  test('renders url if More button is clicked', async () => {
    const user = userEvent.setup()
    const moreButton = screen.getByText('More')
    await user.click(moreButton)

    const details = container.querySelector('.blog_details')
    expect(details).toBeDefined()

    const url = screen.queryByText(blog.url)
    expect(url).toBeDefined()

    const likes = screen.queryByText(`Likes: ${blog.likes}`)
    expect(likes).toBeDefined()
  })

  test('when like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const moreButton = screen.getByText('More')
    await user.click(moreButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
