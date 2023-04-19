require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = require('./schema')

// resolver functions return a promise. When a resolver returns a promise, Apollo server sends back the value which the promise resolves to.
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, {author, genre}) => {
      const query = {}
      if (author) {
        const authorInDb = await Author.findOne({ name: author })
        if (authorInDb) {
          query.author = authorInDb.id
        }
      }

      if (genre) {
        query.genres = { $in: [genre] }
      }

      return Book.find(query).populate('author')
    },
    allAuthors: async () => Author.find({}),
    allAuthorsFiltered: async (_root, {born}) => {
      if(!born) {
        const authors = await Author.find({})
        return authors
      }

      const filteredAuthors = await Authors.find({ born: {$exists: born === 'YES' }})
      return filteredAuthors
    }
  },
  Mutation: {
    addBook: async (_root, { title, author, published, genres }) => {
      let book = new Book({ title, published, genres })
      let authorInDb = await Author.findOne({ name: author })

      if (!authorInDb) {
        authorInDb = new Author({ name: author, bookCount: 1 })
        try {
          await authorInDb.save()
        } catch (error) {
          throw new GraphQLError('Saving author is failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: { author },
              error
            }
          })
        }
      }

      book.author = authorInDb.id
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book is failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { title, published, genres },
            error: error.errors.title
          }
        })
      }

      book = await Book.findById(book.id).populate('author')

      // pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (_root, { name, born }) => {
      let author = await Author.findOne({ name })
      if (author) {
        author.born = born
        await author.save()
      }
      return author
    }
  },
  Author: {
    // Root is the object that contains the result returned from the resolver on the parent field
    bookCount: (root) => Book.collection.countDocuments({ author: root.id })
    //Book.find({ author: root.name }).countDocuments()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
