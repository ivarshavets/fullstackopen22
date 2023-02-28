const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  likes: Number,
  // comments: [String],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // _id property of Mongoose objects looks like a string, it is in fact an object, so it's trusformed to a string first
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    // removing mongo versioning field __v
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
