import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger'

import postsReducer from '../features/posts/postsSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'

import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
  devTools: process.env.NODE_ENV !== 'production',
})
