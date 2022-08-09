import forumService from '../services/forums'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export default reducer

export const getUsers = () => {
  return async (dispatch) => {
    const users = await forumService.getAllUsers()
    dispatch({
      type: 'GET_USERS',
      data: users,
    })
  }
}
