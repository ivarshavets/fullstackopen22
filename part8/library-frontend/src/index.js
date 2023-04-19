import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'
import App from './App'

// client communicate with a GraphQL server
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    },
    allBooks {
      title,
      author {
        name
      },
      genres,
      published,
      id
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
