import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import { notificationQuery } from "api/base";

const notificationApi = createApi({
  reducerPath: "api/notification",
  baseQuery: notificationQuery,
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
      notification.notifications = appendData(
        notification.notifications,
        payload
      );
      notification.count = getUnreadNotification(notification.notifications);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApi.endpoints.getNotifications.matchFulfilled,
      (notification, { payload }) => {
        notification.notifications = payload;
        notification.count = getUnreadNotification(notification.notifications);
      }
    );
    builder.addMatcher(
      notificationApi.endpoints.getNotification.matchFulfilled,
      (notification, { payload }) => {
        const data = notification.notifications.map((n) =>
          n.id === payload.id ? { ...n, read: true } : n
        );
        notification.notifications = data;
        notification.count = getUnreadNotification(notification.notifications);
      }
    );
  },
});

function getUnreadNotification(array) {
  return array.filter((i) => i.read === false).length;
}

function appendData(array, payload) {
  const list = array.filter((element) => element.id !== payload.id);
  list.push(payload);
  return list;
}

export const { reducer } = notificationSlice;
export const { setNotification } = notificationSlice.actions;

export const selectNotificationCount = (state) => state.notification.count;
export const selectNotifications = (state) => state.notification.notifications;

export function pathGenerator(contentId, notificationType) {
  switch (notificationType) {
    case "NEW_PROPOSAL_SUBMISSION":
      return "/clerk/new-submissions";
    case "NEW_USER_REQUEST":
      return "/clerk/new-user-requests";
    case "USER_PROFILE":
      return "/profile";
    case "SECRETARY_UNASSIGNED_PROPOSAL_ID":
      return `/secretary/assigned/${contentId}`;
    case "APPLICANT_ONGOING_PROPOSAL_ID":
      return `/applicant/ongoing-submissions/${contentId}`;
    case "REVIEWER_PENDING_PROPOSAL_ID":
      return `/reviewer/pending/${contentId}`;
    case "SECRETARY_CONFIRM_REVIEW_PROPOSAL_ID":
      return `/secretary/assigned/${contentId}`;
    case "SECRETARY_REJECT_REVIEW_PROPOSAL_ID":
      return `/secretary/assigned/${contentId}`;
    case "SECRETARY_REVIEWED_PROPOSAL_ID":
      return `/secretary/reviewed/${contentId}`;
    default:
      return "/notification";
  }
}
