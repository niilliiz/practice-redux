import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/fakeApi' }),
  tagTypes: ['Posts'],
  // ------------------POSTS ENDPOINTS----------------
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        'Posts',
        ...result.map(({ id }) => ({ type: 'Posts', id })),
      ],
    }),

    getSinglePost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Posts', id: arg }],
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
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetSinglePostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice

console.dir(apiSlice)
