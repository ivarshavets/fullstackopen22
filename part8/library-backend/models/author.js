const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // keep validation in the database, but already ensured that the fields exist with GraphQL
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(uniqueValidator)

// In Mongo the identifying field of an object is called _id but there is no need to parse the name of the field to id since GraphQL can do this automatically.

// schema.set('toJSON', {
//   transform: (_document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

module.exports = mongoose.model('Author', schema)
