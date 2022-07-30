const forumsRouter = require('express').Router()
const Forum = require('../models/forum')

forumsRouter.get('/', async (request, response) => {
  const forums = await Forum
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(forums)
})

forumsRouter.get('/:id', async (request, response) => {
  const forum = await Forum.findById(request.params.id)

  if (forum) {
    response.json(forum.toJSON())
  } else {
    response.status(404).end()
  }
})

forumsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = request.token
  const user = request.user

  if (!token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const forum = new Forum({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedForum = await forum.save()
  user.forum = user.forum.concat(savedForum._id)
  await user.save()

  response.status(201).json(savedForum)
})

forumsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const user = request.user

  if (!token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const forumToDelete = await Forum.findById(request.params.id)

  if(!forumToDelete){
    return response.status(404).send({ error: 'forum not found' })
  }

  if ( forumToDelete.user._id.toString() === user._id.toString() ) {
    await Forum.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

forumsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const token = request.token
  const user = request.user

  if (!token || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const forum = Forum({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  Forum.findByIdAndUpdate(request.params.id, forum, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))

})

module.exports = forumsRouter