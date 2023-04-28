import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Posts', ['Post']],
  // ------------------POSTS ENDPOINTS----------------
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        'Posts',
        ...result.map(({ id }) => ({ type: 'Post', id })),
      ],
    }),

    getSinglePost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),

    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Posts'],
    }),

    editPost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice
