import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

describe('AddBlogForm', () => {
  let container

  const blogPayload = {
    title: 'Test blog',
    author: 'Ira',
    url: 'http://www.blog.com'
  }

  const onAddBlog = jest.fn()
  const onCancel = jest.fn()

  beforeEach(() => {
    container = render(<AddBlogForm onAddBlog={onAddBlog} onCancel={onCancel} />).container
  })

  test('submits the form with correct data', async () => {
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Enter a title')
    await user.type(titleInput, blogPayload.title)

    // alternative options to select inputs with querySelector
    const urlInput = container.querySelector('.blog_url_input')
    await user.type(urlInput, blogPayload.url)

    const authorInput = container.querySelector('.blog_author_input')
    await user.type(authorInput, blogPayload.author)

    const addButton = screen.getByText('Add')
    await user.click(addButton)

    expect(onAddBlog.mock.calls).toHaveLength(1)
    // onAddBlog.mock.calls returns a list of calls, where each call is a list of call's data, e.g.:
    // [ [ { title: 'Blog Title', author: 'Blog Author', url: 'Blog URL' } ] ]
    expect(onAddBlog.mock.calls[0][0]).toEqual(blogPayload)
    // expect(onAddBlog.mock.calls[0][0].title).toBe(blogPayload.title)
    // expect(onAddBlog.mock.calls[0][0].author).toBe(blogPayload.author)
    // expect(onAddBlog.mock.calls[0][0].url).toBe(blogPayload.url)
  })
})
