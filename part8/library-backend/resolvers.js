const { GraphQLError } = require('graphql')
const {AuthenticationError, UserInputError} = require("apollo-server");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
    allAuthors: async (_root, _args, _context, query) => {
      const fieldsNames = query.fieldNodes[0].selectionSet.selections.map(f => f.name.value)
      if (fieldsNames.includes('bookCount') ) {
        bookCache = await Book.find({})
      }
      return Author.find({})
    },
    allAuthorsFiltered: async (_root, {born}) => {
      if(!born) {
        const authors = await Author.find({})
        return authors
      }

      const filteredAuthors = await Authors.find({ born: {$exists: born === 'YES' }})
      return filteredAuthors
    },
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_root, { title, author, published, genres }, {currentUser}) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (_root, { name, born }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      let author = await Author.findOne({ name })
      if (author) {
        author.born = born
        await author.save()
      }
      return author
    },

    createUser: async (_root, {username, password, favouriteGenre}) => {
      // password must be at least 3 chars
      if (!password || password.length < 3) {
        throw new UserInputError('password is required and must be at least 3 chars long')
      }

      // Mongoose does not have a built-in validator for checking the uniqueness of a field. mongoose-unique-validator npm package is a ready-made solution for this.
      const existingUser = await User.findOne({ username })

      if (existingUser) {
        throw new UserInputError('username must be unique')
      }

      // encrypting the password
      const saltRound = 10
      const passwordHash = await bcrypt.hash(password, saltRound)

      const user = new User({
        username,
        passwordHash,
        favouriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (_root, {username, password}) => {
      const user = await User.findOne({ username })

      // passwords themselves are not saved to the database, but hashes calculated from the passwords
      //the bcrypt.compare method is used to check if the password is correct
      const isPwdCorrect = user && await bcrypt.compare(password, user.passwordHash)

      if (!isPwdCorrect) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      // The token is digitally signed using a secret key from the env variable SECRET
      const token = jwt.sign(
        userForToken,
        process.env.JWT_SECRET,
        //{ expiresIn: 60*60 } // token expires in 60*60 seconds = one hour
      )

      return { value: token }
    }
  },
  Author: {
    // Root is the object that contains the result returned from the resolver on the parent field
    bookCount: (root) => Book.collection.countDocuments({ author: root.id })
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
