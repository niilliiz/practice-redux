import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifs = selectAllNotifications(getState())
    const [latestNotification] = allNotifs
    const latestTimestamp = latestNotification ? latestNotification.date : ''

    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )

    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      state.forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach(
        (notif) => (notif.isNew = !notif.read)
      )
    })
  },
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors((state) => state.notification)
