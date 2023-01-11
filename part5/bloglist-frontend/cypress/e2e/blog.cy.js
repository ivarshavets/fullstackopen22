describe('Blog app', function() {
  const user = {
    name: 'John Smith',
    username: 'jsmith',
    password: 'jsmith'
  }

  beforeEach(function() {
    cy.resetDB()
    cy.createUser(user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.contains('Login to application')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('.username').type('jsmith')
      cy.get('.password').type('jsmith')
      cy.get('.login_btn').click()

      cy.contains('Succeessfully logged in!')
      cy.contains(`Logged in as ${user.name}`)
    })

    it('fails with wrong credentials', function() {
      cy.get('.username').type('wrong')
      cy.get('.password').type('credentials')
      cy.get('.login_btn').click()

      cy.get('.flash_message').contains('invalid username or password')
      cy.get('.flash_message').should('have.css', 'background-color', 'rgb(190, 58, 58)')
    })
  })

  describe('When logged in', function() {
    const blog = {
      title: 'Interesting blog post',
      author: 'John Smith',
      url: 'http://www.newblog.com'
    }

    beforeEach(function() {
      cy.login(user.username, user.password)
    })

    it('A blog can be created', function() {
      cy.get('.add_blog_form_btn').click()
      cy.get('.blog_title_input').type(blog.title)
      cy.get('.blog_author_input').type(blog.author)
      cy.get('.blog_url_input').type(blog.url)
      cy.get('.add_blog_btn').click()

      cy.get('.blog_item').contains(blog.title).click()
    })
  })

  describe('When a blog exists', function() {
    beforeEach(function() {
      cy.login(user.username, user.password)
      cy.createBlog({
        title: 'First blog',
        author: 'author',
        url: 'http://www.blog1.com'
      })
      cy.wait(500)
      cy.createBlog({
        title: 'Second blog',
        author: 'author',
        url: 'http://www.blog2.com'
      })
    })

    it('it can be liked', function() {
      cy.contains('More').click()
      cy.contains('Likes: 0')
      cy.contains('Like').click()
      cy.contains('Likes: 0')
    })

    it('creator can remove it', function() {
      cy.get('.blog_item').should('have.length', 2)
      cy.contains('More').click()
      cy.contains('Remove').click()
      cy.contains('First blog').should('not.exist')
      cy.get('.blog_item').should('have.length', 1)
    })

    it('not a creator can not remove it', function() {
      cy.createUser({
        name: 'Second user',
        username: 'user2',
        password: 'user2pwd'
      })

      cy.contains('Logout').click()

      cy.login('user2', 'user2pwd')

      cy.get('.blog_item').should('have.length', 2)
      cy.contains('More').click()
      cy.contains('Remove').click()
      cy.get('.flash_message').contains('only the creator can delete a blog')
      cy.get('.blog_item').should('have.length', 2)
    })

    it('blogs are sorted by likes', () => {
      cy.contains('First blog').parents('.blog_item').contains('More').click()
      cy.contains('First blog').parents('.blog_item').contains('Like').as('FirstBlogLikeBtn')

      cy.contains('Second blog').parents('.blog_item').contains('More').click()
      cy.contains('Second blog').parents('.blog_item').contains('Like').as('SecondBlogLikeBtn')

      cy.get('@FirstBlogLikeBtn').click()
      cy.get('@FirstBlogLikeBtn').parent().contains('Likes: 1')

      cy.get('@SecondBlogLikeBtn').click()
      cy.get('@SecondBlogLikeBtn').parent().contains('Likes: 1')

      cy.get('.blog_item').eq(0).contains('First blog')
      cy.get('.blog_item').eq(1).contains('Second blog')

      cy.get('@SecondBlogLikeBtn').click()
      cy.get('@SecondBlogLikeBtn').parent().contains('Likes: 2')

      cy.get('.blog_item').eq(0).contains('Second blog')
      cy.get('.blog_item').eq(1).contains('First blog')
    })
  })
})
