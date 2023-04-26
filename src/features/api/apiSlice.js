import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
    getSinglePost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),
  }),
})

export const { useGetPostsQuery, useGetSinglePostQuery } = apiSlice
