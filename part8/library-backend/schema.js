const typeDefs = `
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
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    allAuthorsFiltered(born: YesNo): [Author]!
  }

  type Mutation {
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

  enum YesNo {
    YES
    NO
  }
`

module.exports = typeDefs
