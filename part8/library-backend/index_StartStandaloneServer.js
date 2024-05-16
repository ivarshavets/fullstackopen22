const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const context = require('./context')

const server = new ApolloServer({
  typeDefs, //  contains the GraphQL schema
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
