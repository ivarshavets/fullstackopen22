import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id,
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id,
      title,
      author {
        name
      },
      published,
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      },
      published,
      genres,
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      name,
      born,
      bookCount,
      id
    }
  }
`
