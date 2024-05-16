import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import App from './App'
import { STORAGE_KEY } from './utils'

// The link is modified by the context defined by the authLink object so that a possible token is set to header authorization for each request to the server.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(STORAGE_KEY)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

// The server url is wrapped using the function createHttpLink into a suitable httpLink object.
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

// client communicate with a GraphQL server
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

// client.query({ query })
//   .then((response) => {
//     console.log(response.data)
//   })

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
