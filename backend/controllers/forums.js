const forumsRouter = require('express').Router()
const Forum = require('../models/forum')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

forumsRouter.get('/', async (request, response) => {
  const forums = await Forum
    .find({})
    .populate('user', { username: 1, name: 1, id: 1, })
  response.json(forums)
})

forumsRouter.get('/:id', async (request, response) => {
    const resultForum = await Forum
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1, id: 1})
    if (resultForum) {
      response.json(resultForum.toJSON)
    } else {
      response.status(404).end()
    }
})

forumsRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const forum = new Forum({
    ...request.body,
    user: user._id,
  })

  const savedForum = await forum.save()
  user.forums = user.forums.concat(savedForum._id)
  await user.save()

  response.status(201).json(savedForum)
})

forumsRouter.put('/:id', async (request, response) => {
  const updatedForum = {
    ...request.body,
  }

  const savedForum = await Forum.findByIdAndUpdate(request.params.id, updatedForum, { new: true })
  const codeStatus = savedForum ? 200 : 404

  response.status(codeStatus).json(savedForum)
})

forumsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const Id = request.params.id
  const forum = await Forum.findById(Id)

  if (forum.user.toString() === decodedToken.id.toString()) {
    await Forum.findByIdAndDelete(Id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Unauthorized' }) //change error 
  }
})

module.exports = forumsRouter
