const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Author = require('./models/author')
const Book = require('./models/book')

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
    },
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_root, { title, author, published, genres }, {currentUser}) => {
      const currentUser = currentUser
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
  },

  createUser: async (_root, args) => {
    const user = new User({ username: args.username })
    return user.save()
      .catch(error => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      })
  },

  login: async (_root, {username, password}) => {
    const user = await User.findOne({ username })
    // passwords themselves are not saved to the database, but hashes calculated from the passwords
    //the bcrypt.compare method is used to check if the password is correct
    const isPwdCorrect = user && await bcrypt.compare(password, user.passwordHash)

    if (!isPwdCorrect) {
      throw new GraphQLError('wrong credentials', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    // The token is digitally signed using a secret key from the env variable SECRET
    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*60 } // token expires in 60*60 seconds = one hour
    )

    return { value: token }
  }
}

module.exports = resolvers
