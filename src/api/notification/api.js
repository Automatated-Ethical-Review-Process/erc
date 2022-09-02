import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import { notificationQuery } from "api/base";

const notification = createApi({
   reducerPath: "api/notification",
   baseQuery: notificationQuery,
   endpoints: () => ({}),
});

const notificationApi = notification.injectEndpoints({
   endpoints: (build) => ({
      getNotifications: build.query({
         query: () => "/",
      }),
      getNotification: build.query({
         query: (id) => `/${id}`,
      }),
   }),
});

export const { useGetNotificationQuery, useGetNotificationsQuery } =
   notificationApi;

export default notificationApi;

const notificationSlice = createSlice({
   name: "notification",
   initialState: {
      count: 0,
      notifications: [],
   },
   reducers: {
      setNotification(notification, { payload }) {
         notification.count = 5;
         notification.notifications = [...notification.notifications, payload];
      },
   },
   extraReducers: (builder) => {
      builder.addMatcher(
         notificationApi.endpoints.getNotifications.matchFulfilled,
         (notification, { payload }) => {
            notification.notifications = payload;
            notification.count = getUnreadNotification(
               notification.notifications
            );
         }
      );
   },
});

export const { reducer } = notificationSlice;
export const selectNotificationCount = (state) => state.notification.count;
export const selectNotitifcations = (state) => state.notification.notifications;

export function pathGenarator(contentId, notificationType) {
   if (notificationType === "NEW_PROPOSAL_SUBMISSION") {
      return "/clerk/new-submissions";
   } else if (notificationType === "NEW_USER_REQUEST") {
      return "/clerk/new-user-requests";
   } else if (notificationType === "USER_PROFILE") {
      return "/profile";
   } else if (notificationType === "") {
   }
}

function getUnreadNotification(arry) {
   let unreadCount = 0;
   console.log(arry[0]);
   arry.map((element) => {
      if (element.read == false) {
         unreadCount++;
      }
   });
   return unreadCount;
}
