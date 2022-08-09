const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const forumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: Array,
    default: [],
  },
}, {
  timestamps: true
})

forumSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Forum', forumSchema)