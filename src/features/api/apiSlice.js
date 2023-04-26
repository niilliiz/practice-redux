import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),

    getSinglePost: builder.query({
      query: (postId) => `/posts/${postId}`,
    }),

    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useAddNewPostMutation,
} = apiSlice
