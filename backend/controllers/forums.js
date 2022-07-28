const forumRouter = require('express').Router()
const Forum = require('../models/forum')

forumRouter.get('/', (request, response) => {
  Forum
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

forumRouter.post('/', (request, response) => {
  const forum = new Forum(request.body)

  forum
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = forumRouter