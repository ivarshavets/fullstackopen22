import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id,
    name,
    born,
    bookCount
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id,
    title,
    author {
      name
    },
    published,
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS}
`
//findBooksByAuthor
export const ALL_BOOKS = gql`
  query($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query {
    me  {
      favoriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      genres
      published
      author {
        name
      }
    }
  }

`
