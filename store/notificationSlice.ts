// store/notificationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/app/components/notificationWebsocket';

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.event_id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    deleteNotificationByCamIds: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;
      state.notifications = state.notifications.filter(n => !idsToDelete.includes(n.camera_id));
    },

    deleteNotificationByEventIds: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;
      state.notifications = state.notifications.filter(n => !idsToDelete.includes(n.event_id));
    },
  },
});

export const { addNotification, markAsRead, deleteNotificationByCamIds, deleteNotificationByEventIds } = notificationSlice.actions;
export default notificationSlice.reducer;
