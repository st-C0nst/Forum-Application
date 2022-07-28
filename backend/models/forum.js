const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Forum', forumSchema)