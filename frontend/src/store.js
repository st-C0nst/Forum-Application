import { configureStore } from '@reduxjs/toolkit'

import forumsReducer from './reducers/forumsReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const store = configureStore({
  reducer: {
    forums: forumsReducer,
    message: messageReducer,
    user: userReducer,
    users: allUsersReducer,
  }
})

export default store
