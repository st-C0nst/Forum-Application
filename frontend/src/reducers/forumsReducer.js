import forumService from '../services/forums'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_LIKE':
  case 'NEW_COMMENT':
    return state.map((item) =>
      item.id !== action.data.id ? item : action.data
    )

  case 'NEW_FORUM':
    return [...state, action.data]

  case 'DELETE_FORUM':
    return state.filter((item) => item.id !== action.data.id)

  case 'INIT_FORUMS':
    return action.data

  default:
    return state
  }
}

export default reducer

export const initializeForums = () => {
  return async (dispatch) => {
    const forums = await forumService.getAll()
    dispatch({
      type: 'INIT_FORUMS',
      data: forums,
    })
  }
}

export const addForum = (title, content, author, url) => {
  return async (dispatch) => {
    const newForum = await forumService.create({
      title,
      content,
      author,
      url,
    })
    dispatch({
      type: 'NEW_FORUM',
      data: newForum,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedForum = await forumService.newComment(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: updatedForum,
    })
  }
}

export const deleteForum = (id) => {
  return async (dispatch) => {
    await forumService.deleteForum(id)
    dispatch({
      type: 'DELETE_FORUM',
      data: { id },
    })
  }
}

export const addLikeToForum = (forum) => {
  return async (dispatch) => {
    const newForum = await forumService.update(forum.id, {
      ...forum,
      likes: forum.likes + 1,
    })
    dispatch({
      type: 'NEW_LIKE',
      data: newForum,
    })
  }
}
