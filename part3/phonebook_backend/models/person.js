const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// establishing the connection to the DB
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB:', error.message))

// defining the schema for a person and the matching model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: num => {
        return /^\d{2,3}-\d+$/.test(num)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})

// modify the toJSON method of the schema to format the objects returned by Mongoose
personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // _id property of Mongoose objects looks like a string, it is in fact an object
    // transforms it into a string just to be safe
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
