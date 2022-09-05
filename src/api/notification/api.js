import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import { notificationQuery } from "api/base";

const notificationApi = createApi({
  reducerPath: "api/notification",
  baseQuery: notificationQuery,
  keepUnusedDataFor: 3, // FIXME: remove this
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
      setNotifications(
        notification,
        appendData(notification.notifications, payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      notificationApi.endpoints.getNotifications.matchFulfilled,
      (notification, { payload }) => setNotifications(notification, payload)
    );
    builder.addMatcher(
      notificationApi.endpoints.getNotification.matchFulfilled,
      (notification, { payload }) => {
        const data = notification.notifications.map((n) =>
          n.id === payload.id ? { ...n, read: true } : n
        );
        setNotifications(notification, data);
      }
    );
  },
});

function setNotifications(store, data) {
  store.notifications = data.slice().sort((a, b) => b.id - a.id);
  store.count = getUnreadNotification(data);
}

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
    case "USER_PROFILE":
      return "/profile";
    case "NEW_USER_REQUEST":
      return `/clerk/new-user-requests${contentId ? `/${contentId}` : ""}`;
    case "NEW_PROPOSAL_SUBMISSION":
      return `/clerk/new-submissions${contentId ? `/${contentId}` : ""}`;
    case "APPLICANT_ONGOING_PROPOSAL_ID":
      return `/applicant/ongoing-submissions/${contentId}`;
    case "APPLICANT_OLD_PROPOSAL_ID":
      return `/applicant/old-submissions/${contentId}`;
    case "SECRETARY_UNASSIGNED_PROPOSAL_ID":
      return `/secretary/unassigned/${contentId}`;
    case "SECRETARY_CONFIRM_REVIEW_PROPOSAL_ID":
      return `/secretary/assigned/${contentId}`;
    case "SECRETARY_REJECT_REVIEW_PROPOSAL_ID":
      return `/secretary/assigned/${contentId}`;
    case "SECRETARY_REVIEWED_PROPOSAL_ID":
      return `/secretary/reviewed/${contentId}`;
    case "REVIEWER_PENDING_PROPOSAL_ID":
      return `/reviewer/pending/${contentId}`;
    default:
      return "/notification";
  }
}
