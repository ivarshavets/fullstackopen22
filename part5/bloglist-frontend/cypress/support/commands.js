// ***********************************************
// Custom commands
// For comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
})


Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('authenticatedUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('authenticatedUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
