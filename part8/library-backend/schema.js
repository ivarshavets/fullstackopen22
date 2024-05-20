const typeDefs = `
  type User {
    username: String!
    passwordHash: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int
    genres: [String]!
    id: ID!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    allAuthorsFiltered(born: YesNo): [Author]!
  }

  type Mutation {
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]!
    ): Book

    editAuthor(
      name: String!
      born: Int!
    ): Author
  }

  type Subscription {
    bookAdded: Book!
  }

  enum YesNo {
    YES
    NO
  }
`

module.exports = typeDefs
