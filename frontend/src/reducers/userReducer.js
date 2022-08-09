import forumService from '../services/forums'
import loginService from '../services/login'
import userService from '../services/user'
import { setSuccessMessage, setErrorMessage } from './messageReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data

  case 'LOGOUT_USER':
    return null

  default:
    return state
  }
}

export default reducer

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedForumappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    forumService.setToken(user.token)
    return {
      type: 'SET_USER',
      data: user,
    }
  }

  return { type: 'LOGOUT_USER' }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedForumappUser')
  return { type: 'LOGOUT_USER' }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedForumappUser', JSON.stringify(user))
      forumService.setToken(user.token)
      dispatch(setUser())
      dispatch(setSuccessMessage(`Welcome ${user.name}`))
    } catch (error) {
      dispatch(setErrorMessage('Wrong username or password'))
    }
  }
}

export const userCreate = (username, name, password) => {
  return async (dispatch) => {
    try {
      await userService.signUp({
        username,
        name,
        password,
      })
      dispatch(setSuccessMessage('Sign up successful'))
    } catch (error) {
      dispatch(setErrorMessage('Username taken'))
    }
  }
}
