import {  createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import { ALL_BOOKS } from './queries.js'

export const updateCacheWith = (addedBook, cache) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (list) => {
    let seen = new Set()
    return list.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })

  // const genres = addedBook.genres.filter(genre => {
  //   return cache.readQuery({ query: ALL_BOOKS, variables: { genre } })
  // })

  // genres.forEach(genre => {
  //   cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
  //     return {
  //       allBooks: uniqByTitle(allBooks.concat(addedBook)),
  //     }
  //   })
  // })
}

export const STORAGE_KEY = 'library-user-token'

export const getWsHttpSplitLink = () => {
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:4000/',
  }))

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(STORAGE_KEY)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      }
    }
  })

  const httpLink = createHttpLink({ uri: 'http://localhost:4000' })

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  )

  return splitLink
}
