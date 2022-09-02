import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import { notificationQuery } from "api/base";
import { bool } from "yup";

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
         console.log("Initals", notification.notifications.length);
         notification.notifications = appendData(
            notification.notifications,
            payload
         );
         console.log("After", notification.notifications.length);
         notification.count = getUnreadNotification(notification.notifications);
         console.log("After", notification.count);
         console.log("trigered");
         console.log(payload);
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
export const { setNotification } = notificationSlice.actions;
export const selectNotificationCount = (state) => state.notification.count;
export const selectNotitifcations = (state) => state.notification.notifications;

export function pathGenarator(contentId, notificationType) {
   if (notificationType === "NEW_PROPOSAL_SUBMISSION") {
      return "/clerk/new-submissions";
   } else if (notificationType === "NEW_USER_REQUEST") {
      return "/clerk/new-user-requests";
   } else if (notificationType === "USER_PROFILE") {
      return "/profile";
   } else if (notificationType === "SECRETARY_UNASSIGNED_PROPOSAL_ID") {
      return `/secretary/assigned/${contentId}`;
   } else if (notificationType === "APPLICANT_ONGOING_PROPOSAL_ID") {
      return `/applicant/ongoing-submissions/${contentId}`;
   } else if (notificationType === "REVIEWER_PENDING_PROPOSAL_ID") {
      return `/reviewer/pending/${contentId}`;
   } else if (notificationType === "SECRETARY_CONFIRM_REVIEW_PROPOSAL_ID") {
      return `/secretary/assigned/${contentId}`;
   } else if (notificationType === "SECRETARY_REJECT_REVIEW_PROPOSAL_ID") {
      return `/secretary/assigned/${contentId}`;
   } else if (notificationType === "SECRETARY_REVIEWED_PROPOSAL_ID") {
      return `/secretary/reviewed/${contentId}`;
   } else if (notificationType === "USER_PROFILE") {
      return `/profile`;
   } else if (notificationType === "USER_PROFILE") {
      return `/profile`;
   } else if (notificationType === "USER_PROFILE") {
      return `/profile`;
   } else if (notificationType === "USER_PROFILE") {
      return `/profile`;
   } else {
      return "/notification";
   }
}

function getUnreadNotification(arry) {
   let unreadCount = 0;
   arry.map((element) => {
      if (element.read == false) {
         unreadCount++;
      }
   });
   return unreadCount;
}

function appendData(arry, payload) {
   const list = arry.filter((element) => element.id != payload.id);
   list.push(payload);
   return list;
}
